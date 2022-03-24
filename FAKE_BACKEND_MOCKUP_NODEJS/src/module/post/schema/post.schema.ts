import { User } from '@module/user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class React {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    user: Types.ObjectId | User;

    @Prop({ default: 'like' })
    type: string;
}

@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Comment {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    user: Types.ObjectId | User;

    @Prop({ default: 'like' })
    type: string;
}

@Schema({
    collection: 'post',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Post {
    @Prop({
        type: [Types.ObjectId],
        default: [],
    })
    tag: Types.ObjectId[];

    @Prop()
    content: string;

    @Prop({
        type: [Types.ObjectId],
        default: [],
        ref: 'Media',
    })
    media: Types.ObjectId;

    @Prop({ default: false })
    isPublish: boolean;

    @Prop({ default: false })
    isAnonymous: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId | User;

    @Prop({
        type: [Types.ObjectId],
        default: [],
    })
    report: Types.ObjectId[];

    @Prop({ default: 1 })
    views: number;

    @Prop({
        type: [Object],
        default: [],
    })
    react: React[];

    @Prop({
        type: [Types.ObjectId],
        default: [],
        ref: 'User',
    })
    userSave: Types.ObjectId[];

    @Prop({
        type: [Types.ObjectId],
        default: [],
        ref: 'Comment',
    })
    comment: Types.ObjectId[];
}

export type PostDocument = Post & Document;
export type ReactDocument = React & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
