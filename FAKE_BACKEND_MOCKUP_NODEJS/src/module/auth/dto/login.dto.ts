import { Injectable } from '@nestjs/common';
import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

@Injectable()
export class LoginDto {
    @IsNotEmpty()
    @Length(5, 20)
    @IsAlphanumeric()
    username: string;

    @IsNotEmpty()
    password: string
}