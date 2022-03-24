import { convertToObjectId } from '@lib/helper/uuid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

    findByUsername(username: string) {
        return new Promise((resolve, reject) => {
            const query = this.userModel.findOne({ username });

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

    findAll() {
        return new Promise((resolve, reject) => {
            const query = this.userModel.find();

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

    /** save post */
    addToSavedPost(userId: string, postId: string) {
        return new Promise((resolve, reject) => {
            const query = this.userModel
                .findOneAndUpdate(
                    {
                        _id: convertToObjectId(userId),
                        $not: {
                            savedPost: postId,
                        },
                    },
                    { $push: { savedPost: postId } }
                )
                .lean();

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

    unSavedPost(userId: string, postId: string) {
        return new Promise((resolve, reject) => {
            const query = this.userModel
                .findOneAndUpdate(
                    {
                        _id: convertToObjectId(userId),
                        savedPost: convertToObjectId(postId),
                    },
                    { $pull: { savedPost: postId } }
                )
                .lean();

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

    /** follow */
    followUser(payloadFollower: any) {
        return new Promise((resolve, reject) => {
            const query = Promise.all([
                this.userModel
                    .findOneAndUpdate(
                        {
                            _id: convertToObjectId(payloadFollower.user),
                            $not: {
                                following: payloadFollower.followingUser,
                            },
                        },
                        { $push: { following: payloadFollower.followingUser } },

                        { new: true }
                    )
                    .lean()
                    .exec(),
                this.userModel
                    .findOneAndUpdate(
                        {
                            _id: convertToObjectId(payloadFollower.followingUser),
                            $not: {
                                follower: payloadFollower.user,
                            },
                        },
                        { $push: { follower: payloadFollower.user } },
                        { new: true }
                    )
                    .lean()
                    .exec(),
            ]);

            query
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    unfollowUser(payloadUnfollow: any) {
        return new Promise((resolve, reject) => {
            const query = Promise.all([
                this.userModel
                    .findOneAndUpdate(
                        {
                            _id: convertToObjectId(payloadUnfollow.user),
                            following: convertToObjectId(payloadUnfollow.unfollowingUser),
                        },
                        { $pull: { following: payloadUnfollow.unfollowingUser } }
                    )
                    .lean()
                    .exec(),
                this.userModel
                    .findOneAndUpdate(
                        {
                            _id: convertToObjectId(payloadUnfollow.unfollowingUser),
                            follower: convertToObjectId(payloadUnfollow.user),
                        },
                        { $pull: { follower: payloadUnfollow.user } },
                        { new: true }
                    )
                    .lean()
                    .exec(),
            ]);

            query
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
