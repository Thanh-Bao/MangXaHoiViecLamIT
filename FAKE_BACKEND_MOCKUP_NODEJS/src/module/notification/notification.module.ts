import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MediaModule } from '../media/media.module';
import { UserModule } from '@module/user/user.module';
import { NotificationSchema } from './notification.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EventListener } from './event.listener';
import { GatewayModule } from '@module/gateway/gateway.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: 'Notification',
                schema: NotificationSchema,
            },
        ]),
        UserModule,
        GatewayModule,
    ],
    controllers: [NotificationController],
    providers: [NotificationService, EventListener],
})
export class NotificationModule {}
