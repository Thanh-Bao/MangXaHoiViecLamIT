import {
    Controller,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { MediaRecord } from './decorator/media.decorator';
import { MediaService } from './media.service';
import { MediaDocument } from './schema/media.schema';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('media'))
    upload(@MediaRecord() media: MediaDocument, @UploadedFile() file: Express.Multer.File) {
        return media;
    }
}
