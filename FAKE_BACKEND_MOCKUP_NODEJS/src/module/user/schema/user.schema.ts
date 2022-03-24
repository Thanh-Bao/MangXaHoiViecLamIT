import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection: 'user',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
    @Prop({
        default: '/default/user/avatar.png',
    })
    avatar: string;

    @Prop({
        unique: true,
        required: true,
    })
    username: string;

    @Prop({
        type: [Types.ObjectId],
        default: [],
        ref: 'Post',
    })
    savedPost: Types.ObjectId[];

    @Prop({ required: true })
    password: string;

    @Prop({ type: [Types.ObjectId], default: [], ref: 'User' })
    following: Types.ObjectId[];

    @Prop({ type: [Types.ObjectId], default: [], ref: 'User' })
    follower: Types.ObjectId[];

    @Prop({ default: true })
    isActivated: boolean;

    @Prop({ default: false })
    isLocked: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
