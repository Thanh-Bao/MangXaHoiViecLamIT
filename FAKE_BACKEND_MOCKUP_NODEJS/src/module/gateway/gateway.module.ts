import { PostModule } from '@module/post/post.module';
import { PostService } from '@module/post/post.service';
import { Module } from '@nestjs/common';
import { NotifyGateway } from './notify.gateway';

@Module({
    imports: [PostModule],
    providers: [NotifyGateway],
    exports: [NotifyGateway],
})
export class GatewayModule {}
