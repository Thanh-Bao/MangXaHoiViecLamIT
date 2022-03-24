import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaDocument } from './schema/media.schema';

@Injectable()
export class MediaService {
	constructor(@InjectModel(Media.name) public mediaModel: Model<MediaDocument>) {}

	create(file: any) {
		return new Promise((resolve, reject) => { 
				const query = new this.mediaModel(file);

				query.save().then(record => { resolve(record) }).catch(error => { reject(error) });
			});
	}

	getOneToView(params: any) {
		return new Promise((resolve, reject) => {
			const query = this.mediaModel.findOneAndUpdate(params, { $inc: { views: 1 } }).lean().populate('user');

			query.exec().then(record => { resolve(record) }).catch(error => { reject(error) });
		});
	}

	update(id: string | ObjectId, updateMediaDto: any) {
		return new Promise((resolve, reject) => { 
			const query = this.mediaModel.findOneAndUpdate({ _id: id }, updateMediaDto).lean();
		
			query.exec().then(record => { resolve(record) }).catch(error => { reject(error) });
		});
	}
}
