import { LocalAuthGuard } from '@module/auth/local.auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserAuthService } from './user.auth.service';

@Controller('auth/user')
export class UserAuthController {
    constructor(
        private readonly userAuthService: UserAuthService,
    ) {}
    
    @Post('register')
    async register(@Body() params: UserRegisterDto) {
        return this.userAuthService.register(params);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return req.user;
    }
}
