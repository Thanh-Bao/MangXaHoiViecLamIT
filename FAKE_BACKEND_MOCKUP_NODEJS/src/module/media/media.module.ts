import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '../auth/auth.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaSchema } from './schema/media.schema';
import { UploadService } from './upload.service';

@Module({
    imports: [
        AuthModule,
        MulterModule.registerAsync({
            imports: [MediaModule],
            useClass: UploadService,
        }),
        MongooseModule.forFeature([
            {
                name: 'Media',
                schema: MediaSchema,
            },
        ]),
    ],
    controllers: [MediaController],
    providers: [MediaService, UploadService],
    exports: [MediaService],
})
export class MediaModule {}
