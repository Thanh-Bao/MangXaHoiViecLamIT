import { IsUsernameUnique } from '@module/admin/validator/isUsernameUnique';
import { Injectable } from '@nestjs/common';
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

@Injectable()
export class CreateAdminDto {
    @IsNotEmpty()
    @Length(5, 20)
    @IsAlphanumeric()
    @IsUsernameUnique()
    username: string;

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    name: string
}