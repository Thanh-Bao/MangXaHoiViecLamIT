import { Post } from '@module/post/schema/post.schema';
import { User } from '@module/user/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Source {
    @Prop({ type: Types.ObjectId, refPath: 'source.type', required: true })
    object: Types.ObjectId | User;

    @Prop({ default: 'User' })
    type: string;
}

@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Destination {
    @Prop({ type: Types.ObjectId, refPath: 'destination.type', required: true })
    object: Types.ObjectId | Post;

    @Prop({ default: 'Post' })
    type: string;
}

@Schema({
    collection: 'notification',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Notification {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId | User;

    @Prop({ type: Object })
    source: Source;

    @Prop({ type: Object })
    destination: Destination;

    @Prop()
    type: string;

    @Prop({ default: false })
    isRead: boolean;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
