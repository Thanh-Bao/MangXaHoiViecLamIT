import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'admin' })
export class Admin {
    @Prop({ required: true })
    name: string

    @Prop()
    avatar: string;

    @Prop({
        unique: true,
        required: true
    })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    isActivated: boolean;

    @Prop({ default: false }) 
    isBlocked: boolean;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);