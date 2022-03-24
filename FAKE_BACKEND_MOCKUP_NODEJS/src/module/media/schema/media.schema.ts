import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'media' })
export class Media {
    @Prop({
        type: [Types.ObjectId], 
        default: []
    })
    tag: Types.ObjectId[];

    @Prop()
    url: string;

    @Prop({ default: 'unknown'})
    type: string;

    @Prop()
    title: string;

    @Prop({ default: ''})
    content: string;

    @Prop({ default: false }) 
    isPublish: boolean;

    @Prop({ default: true }) 
    isDraft: boolean;

    @Prop({ default: false }) 
    isAnonymous: boolean

    @Prop({ type: Types.ObjectId , ref: 'User' })
    user: Types.ObjectId

    @Prop({
        type: [Types.ObjectId], 
        default: []
    })
    report: Types.ObjectId[];

    @Prop({ default: 1 })
    views: number
}

export type MediaDocument = Media & Document;

export const MediaSchema = SchemaFactory.createForClass(Media);