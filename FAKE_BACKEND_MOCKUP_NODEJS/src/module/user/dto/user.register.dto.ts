import { IsUsernameUnique } from '@module/user/validator/isUsernameUnique';
import { Injectable } from '@nestjs/common';
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

@Injectable()
export class UserRegisterDto {
    @IsNotEmpty()
    @Length(5, 20)
    @IsAlphanumeric()
    @IsUsernameUnique()
    username: string;

    @IsNotEmpty()
    password: string
}