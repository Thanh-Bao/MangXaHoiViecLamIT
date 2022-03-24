import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { MediaService } from "./media.service";
import { last, split } from 'lodash';
import { ConfigService } from "@nestjs/config";
import { Types } from "mongoose";
import { convertToObjectId } from "@lib/helper/uuid";

@Injectable()
export class UploadService implements MulterOptionsFactory {
    constructor(
        private readonly mediaService: MediaService,
        private readonly configService: ConfigService,
    ) {}

    createMulterOptions(): MulterModuleOptions {        
        const mediaPath =  this.configService.get<string>('MEDIA_UPLOAD');
        const uploadPath = this.configService.get<string>('ROOT_UPLOAD') + '/' + mediaPath;

        return {
            storage: diskStorage({
                destination: uploadPath,
                filename: (request, file, cb) => {
                    (async () => {
                        try {
                            const { originalname } = file;
                            const extension =  last(split(originalname, '.'));
                            const nameFile = (new Date().valueOf()) + '';
                            const fullnameFile = nameFile + '.' + extension;

                            const mediaDoc = await this.mediaService.create({
                                title: originalname,
                                url: '/'+ mediaPath + '/' + fullnameFile,
                                user: convertToObjectId(request.user['userId'])
                            });
                            
                            request['mediaDocument'] = mediaDoc;

                            cb(null, fullnameFile) ;
                        }
                        catch (err) {
                            throw new UnprocessableEntityException();
                        }                        
                    })();                    
                }
            })
        };
    }
}