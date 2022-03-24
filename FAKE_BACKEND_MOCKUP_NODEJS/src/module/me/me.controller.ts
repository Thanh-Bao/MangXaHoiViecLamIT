import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@module/auth/jwt.auth.guard';
import { UserService } from '@module/user/user.service';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private readonly userService: UserService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  getMeInformation(@Request() req) {
    return this.userService.findByUsername(req.user.username);
  }
}
