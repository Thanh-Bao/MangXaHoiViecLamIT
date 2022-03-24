import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostSchema } from './schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MediaModule } from '../media/media.module';
import { UserModule } from '@module/user/user.module';
import { CommentSchema } from './schema/comment.schema';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: 'Post',
                schema: PostSchema,
            },
            {
                name: 'Comment',
                schema: CommentSchema,
            },
        ]),
        MediaModule,
        UserModule,
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}
