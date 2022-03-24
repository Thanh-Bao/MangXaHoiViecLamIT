import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@module/auth/jwt.auth.guard';
import { convertToObjectId } from '@lib/helper/uuid';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get('/profile/:username')
    async getUserByUsername(@Param('username') username: string) {
        return this.userService.findByUsername(username);
    }

    @Post('/follow/:userId')
    @UseGuards(JwtAuthGuard)
    async followUser(@Request() req, @Param('userId') userFollowId: string) {
        const { user } = req;

        return this.userService.followUser({
            user: user.userId,
            followingUser: userFollowId,
        });
    }

    @Post('/unfollow/:userId')
    @UseGuards(JwtAuthGuard)
    async unfollowUser(@Request() req, @Param('userId') userFollowId: string) {
        const { user } = req;

        return this.userService.unfollowUser({
            user: user.userId,
            unfollowingUser: userFollowId,
        });
    }
}
