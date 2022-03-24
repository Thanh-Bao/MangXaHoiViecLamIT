import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
	constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

	create(params: CreateAdminDto): Promise<Admin> {
		return new Promise((resolve, reject) => { 
			const created = new this.adminModel(params);

			created.save().then(record => { resolve(record) }).catch(error => { reject(error) });
		});
	}

	findByUsername(username: string) {
		return new Promise((resolve, reject) => { 
			const query = this.adminModel.findOne({ username });

			query.exec().then(record => { resolve(record) }).catch(error => { reject(error) });
		});
	}

	findAll() {
		
	}

	findOne(id: number) {
		return `This action returns a #${id} admin`;
	}

	update(id: number, updateAdminDto: UpdateAdminDto) {
		return `This action updates a #${id} admin`;
	}

	remove(id: number) {
		return `This action removes a #${id} admin`;
	}
}
