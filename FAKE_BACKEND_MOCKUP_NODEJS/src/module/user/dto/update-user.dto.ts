import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from './user.register.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
