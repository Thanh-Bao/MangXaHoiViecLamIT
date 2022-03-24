import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './module/admin/admin.module';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { AuthModule } from './module/auth/auth.module';
import { MeModule } from './module/me/me.module';
import { MediaModule } from './module/media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from '@module/notification/notification.module';
import { GatewayModule } from '@module/gateway/gateway.module';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DATABASE_URI'),
            }),
            inject: [ConfigService],
        }),
        ServeStaticModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => [
                {
                    rootPath: join(__dirname, '..', configService.get<string>('ROOT_UPLOAD')),
                },
            ],
            inject: [ConfigService],
        }),
        AuthModule,
        AdminModule,
        UserModule,
        PostModule,
        MeModule,
        MediaModule,
        NotificationModule,
        GatewayModule,
        PostModule,
    ],
})
export class AppModule {}
