import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { convertToObjectId } from '@lib/helper/uuid';
import { map } from 'lodash';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    /** View post */
    @Get()
    get() {
        return this.postService.getNewest({
            isPublish: true,
        });
    }

    @Get('content/:postId')
    getDetail(@Param('postId') id: string) {
        return this.postService.getOneToView({
            isPublish: true,
            _id: convertToObjectId(id),
        });
    }

    @Get('photo/:id')
    getPhoto(@Param('id') id: string) {
        return this.postService.getOnePhotoToView({
            //isPublish: true,
            _id: convertToObjectId(id),
        });
    }

    @Get('user/:userId')
    getByUser(@Param('userId') id: string) {
        return this.postService.getNewest({
            isPublish: true,
            user: convertToObjectId(id),
        });
    }

    /** Create post */
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Request() req, @Body() createPostDto: any) {
        createPostDto['user'] = convertToObjectId(req.user.userId);
        createPostDto['media'] = map(createPostDto['media'], (item) => convertToObjectId(item));
        createPostDto['isPublish'] = true;

        return this.postService.create(createPostDto);
    }

    /** React post */
    @Post('react/:postId')
    @UseGuards(JwtAuthGuard)
    reactPost(@Request() req, @Param('postId') id: string) {
        const { user } = req;

        return this.postService.reactPost(
            {
                isPublish: true,
                _id: convertToObjectId(id),
                react: {
                    $not: {
                        $elemMatch: {
                            user: user.userId,
                        },
                    },
                },
            },
            {
                user: user.userId,
                type: 'like',
            }
        );
    }

    @Post('unreact/:postId')
    @UseGuards(JwtAuthGuard)
    unReactPost(@Request() req, @Param('postId') id: string) {
        const { user } = req;

        return this.postService.unReactPost(
            {
                isPublish: true,
                _id: convertToObjectId(id),
                react: {
                    $elemMatch: {
                        user: user.userId,
                    },
                },
            },
            {
                user: user.userId,
                type: 'like',
            }
        );
    }

    /** Save post */
    @Post('save/:postId')
    @UseGuards(JwtAuthGuard)
    savePost(@Request() req, @Param('postId') id: string) {
        const { user } = req;

        return this.postService.savePost(user.userId, id);
    }

    @Post('unsave/:postId')
    @UseGuards(JwtAuthGuard)
    unsavePost(@Request() req, @Param('postId') id: string) {
        const { user } = req;

        return this.postService.unSavePost(user.userId, id);
    }

    /** Get comment  */
    @Get('comment/post/:postId')
    getComment(@Param('postId') post: string) {
        return this.postService.getComment({
            post: convertToObjectId(post),
        });
    }

    /** Comment to post */
    @Post('comment/post/:postId')
    @UseGuards(JwtAuthGuard)
    commentPost(@Request() req, @Param('postId') post: string, @Body() comment: any) {
        const { user } = req;

        return this.postService.commentPost({
            ...comment,
            user: convertToObjectId(user.userId),
            post: convertToObjectId(post),
        });
    }

    /** React comment */
    @Post('comment/react/:commentId')
    @UseGuards(JwtAuthGuard)
    reactCommentPost(@Request() req, @Param('commentId') id: string) {
        const { user } = req;

        return this.postService.reactComment(
            {
                isPublish: true,
                _id: convertToObjectId(id),
                react: {
                    $not: {
                        $elemMatch: {
                            user: user.userId,
                        },
                    },
                },
            },
            {
                user: user.userId,
                type: 'like',
            }
        );
    }

    @Post('comment/unreact/:commentId')
    @UseGuards(JwtAuthGuard)
    unreactCommentPost(@Request() req, @Param('commentId') id: string) {
        const { user } = req;

        return this.postService.unReactComment(
            {
                isPublish: true,
                _id: convertToObjectId(id),
                react: {
                    $elemMatch: {
                        user: user.userId,
                    },
                },
            },
            {
                user: user.userId,
                type: 'like',
            }
        );
    }
}
