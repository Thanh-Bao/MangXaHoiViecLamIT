import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UserAuthController } from './user/user.auth.controller';
import { UserAuthService } from './user/user.auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';

@Module({ 
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000h' },
    }),
    MongooseModule.forFeature([{ 
      name: 'User',
      schema: UserSchema
  }]),
  ],
  controllers: [UserAuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserAuthService],
  exports: [AuthService],
})
export class AuthModule {}
