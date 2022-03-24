import { convertToObjectId } from '@lib/helper/uuid';
import { UserService } from '@module/user/user.service';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikePostEvent, LikePostEventName } from 'src/event/post.event';
import { MediaService } from '../media/media.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CommentDocument } from './schema/comment.schema';
import { Comment, Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) public postModel: Model<PostDocument>,
        @InjectModel(Comment.name) public commentModel: Model<CommentDocument>,
        private readonly mediaService: MediaService,
        private readonly userService: UserService,
        private eventEmitter: EventEmitter2
    ) {}

    create(createPostDto: CreatePostDto) {
        return new Promise((resolve, reject) => {
            const query = new this.postModel(createPostDto);

            query
                .save()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getNewest(params: any) {
        return new Promise((resolve, reject) => {
            const query = this.postModel
                .find(params)
                .sort({ _id: -1 })
                .lean()
                .populate(['user', 'media']);

            query
                .exec()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get detail post for user, will increse view and hook something...
     *
     * @param condition
     * @returns
     */
    getOneToView(condition: any) {
        return new Promise((resolve, reject) => {
            const query = this.postModel
                .findOneAndUpdate(condition, { $inc: { views: 1 } })
                .lean()
                .populate(['user', 'media']);

            query
                .exec()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getOne(params: any) {
        return new Promise((resolve, reject) => {
            const query = this.postModel.findOne(params).lean().populate(['user', 'media']);

            query
                .exec()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getOnePhotoToView(params: any) {
        return new Promise((resolve, reject) => {
            this.postModel
                .updateOne(
                    {
                        media: params._id,
                    },
                    {
                        $inc: { views: 1 },
                    }
                )
                .then((record) => this.mediaService.getOneToView(params))
                .then((record) => resolve(record))
                .catch((error) => {
                    reject(error);
                });
        });
    }

    reactPost(condition: any, dataReact: any) {
        return new Promise((resolve, reject) => {
            const query = this.postModel
                .findOneAndUpdate(condition, { $push: { react: dataReact } }, { new: true })
                .lean();

            query
                .exec()
                .then((topic) => {
                    if (topic) {
                        this.eventEmitter.emit(
                            LikePostEventName,
                            new LikePostEvent(topic.user.toString(), topic._id, dataReact.user)
                        );
                        resolve(topic.react);
                    } else resolve(null);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    unReactPost(condition: any, dataReact: any) {
        return new Promise((resolve, reject) => {
            const query = this.postModel
                .findOneAndUpdate(condition, { $pull: { react: dataReact } }, { new: true })
                .lean();

            query
                .exec()
                .then((topic) => {
                    resolve(topic.react);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    savePost(userId: string, postId: string) {
        return new Promise((resolve, reject) => {
            this.userService
                .addToSavedPost(userId, postId)
                .then((user) => {
                    const query = this.postModel
                        .findOneAndUpdate(
                            {
                                _id: convertToObjectId(postId),
                                $not: {
                                    userSave: convertToObjectId(userId),
                                },
                            },
                            { $push: { userSave: userId } },
                            { new: true }
                        )
                        .lean();

                    query
                        .exec()
                        .then((post) => {
                            if (post) resolve(post.userSave);
                            else resolve(null);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    unSavePost(userId: string, postId: string) {
        return new Promise((resolve, reject) => {
            this.userService
                .unSavedPost(userId, postId)
                .then((user) => {
                    const query = this.postModel
                        .findOneAndUpdate(
                            {
                                _id: convertToObjectId(postId),
                                userSave: convertToObjectId(userId),
                            },
                            { $pull: { userSave: userId } },
                            { new: true }
                        )
                        .lean();

                    query
                        .exec()
                        .then((post) => {
                            if (post) resolve(post.userSave);
                            else resolve(null);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getComment(condition: any) {
        return new Promise((resolve, reject) => {
            const query = this.commentModel
                .find(condition)
                .sort({ _id: -1 })
                .lean()
                .populate(['user']);

            query
                .exec()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    commentPost(commentData: any) {
        return new Promise((resolve, reject) => {
            const query = new this.commentModel(commentData);

            query
                .save()
                .then((record) => query.populate(['user']))
                .then((record) => {
                    this.postModel
                        .findOneAndUpdate(
                            { _id: record.post },
                            { $push: { comment: record._id } },
                            { new: true }
                        )
                        .lean()
                        .exec()
                        .then(() => {
                            resolve(record);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    reactComment(condition: any, dataReact: any) {
        return new Promise((resolve, reject) => {
            const query = this.commentModel
                .findOneAndUpdate(condition, { $push: { react: dataReact } }, { new: true })
                .lean();

            query
                .exec()
                .then((comment) => {
                    if (comment) resolve(comment.react);
                    else resolve(null);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    unReactComment(condition: any, dataReact: any) {
        return new Promise((resolve, reject) => {
            const query = this.commentModel
                .findOneAndUpdate(condition, { $pull: { react: dataReact } }, { new: true })
                .lean();

            query
                .exec()
                .then((topic) => {
                    resolve(topic.react);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
