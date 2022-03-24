import { User } from '@module/user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post, React } from './post.schema';

@Schema({
    collection: 'comment',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Comment {
    @Prop()
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId | User;

    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    post: Types.ObjectId | Post;

    @Prop({
        type: [Types.ObjectId],
        default: [],
    })
    report: Types.ObjectId[];

    @Prop({
        type: [Object],
        default: [],
    })
    react: React[];
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
