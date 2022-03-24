import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UserModule } from '@module/user/user.module';
import { AuthModule } from '@module/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    UserModule
  ],
  controllers: [MeController],
  providers: [MeService]
})
export class MeModule {}
