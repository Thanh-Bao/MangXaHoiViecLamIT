import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { IsUsernameUniqueFieldConstraint } from './validator/isUsernameUnique';
import { UserAuthService } from '../auth/user/user.auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [UserController],
    providers: [IsUsernameUniqueFieldConstraint, UserService, UserAuthService],
    exports: [UserService, UserAuthService],
})
export class UserModule {}
