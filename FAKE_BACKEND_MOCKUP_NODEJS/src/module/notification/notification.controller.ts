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
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { convertToObjectId } from '@lib/helper/uuid';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Get('/user/:userId')
    getDetail(@Param('userId') userId: string) {
        return this.notificationService.getByUser(userId);
    }

    @Post('/read/all')
    readAllNotification() {
        return this.notificationService.readAll();
    }

    @Post('/read/only/:notifyId')
    @UseGuards(JwtAuthGuard)
    readNotification(@Param('notifyId') notifyId: string) {
        return this.notificationService.update(
            { _id: convertToObjectId(notifyId) },
            { isRead: true }
        );
    }

    @Post('/unread/only/:notifyId')
    @UseGuards(JwtAuthGuard)
    unreadNotification(@Param('notifyId') notifyId: string) {
        return this.notificationService.update(
            { _id: convertToObjectId(notifyId) },
            { isRead: true }
        );
    }
}
