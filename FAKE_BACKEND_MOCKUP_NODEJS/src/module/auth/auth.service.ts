import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthService } from './user/user.auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@module/user/schema/user.schema';
import { JWT_USER_ID_FIELD } from '../../config/authentication';

@Injectable()
export class AuthService {
    constructor(
        private userAuthService: UserAuthService,
        private jwtService: JwtService,
        @InjectModel(User.name) public userModel: Model<UserDocument>
    ) {}

    async login(username: string, password: string) {
        const userInfo = await this.userAuthService.validateUser({ username, password });
        
        if (!userInfo) {
            throw new UnauthorizedException();
        } 

        return {
            user: userInfo, 
            access_token: this.jwtService.sign({
                userId: userInfo[JWT_USER_ID_FIELD],
                username: userInfo.username
            }),          
        };
    }
}
