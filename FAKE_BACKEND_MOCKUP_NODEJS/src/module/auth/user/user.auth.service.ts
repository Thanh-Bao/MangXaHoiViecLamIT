import { User, UserDocument } from '@module/user/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserRegisterDto } from '../../user/dto/user.register.dto';

@Injectable()
export class UserAuthService {
	constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

	private async hashPassword(password: string) {
		const salt = await bcrypt.genSalt();
		const passwordHashed = await bcrypt.hash(password, salt);

		return passwordHashed;
	}

	private async matchPassword(password: string, hashedPassword: string) {
		const isMatch = await bcrypt.compare(password, hashedPassword);

		return isMatch;
	}

	findByUsername(username: string) {
		return new Promise((resolve, reject) => { 
			const query = this.userModel.findOne({ username });

			query.exec().then(record => { resolve(record) }).catch(error => { reject(error) });
		});
	}

	register(createUserDto: UserRegisterDto) {
		return new Promise((resolve, reject) => {
			(async () => {
				const password = await this.hashPassword(createUserDto.password);

				const created = new this.userModel({
					...createUserDto,
					password
				});

				created.save().then(record => { resolve(record) }).catch(error => { reject(error) });
			})()
			
		});
	}

	async validateUser(params: any): Promise<any> {
		const user = await this.userModel.findOne({
			username: params.username,
			isLocked: false
		});

		let userValidated = false;

		if(user) {
			userValidated = await this.matchPassword(params.password, user.password);
		}

		return userValidated == true ? user : null
	}
}
