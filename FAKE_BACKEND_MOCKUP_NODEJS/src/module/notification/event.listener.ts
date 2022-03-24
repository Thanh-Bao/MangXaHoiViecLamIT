import { convertToObjectId } from '@lib/helper/uuid';
import { UserService } from '@module/user/user.service';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotifyEvent, NotifyEventName } from 'src/event/notify.event';
import {
    CommentPostEvent,
    CommentPostEventName,
    LikePostEvent,
    LikePostEventName,
} from 'src/event/post.event';
import { NotificationService } from './notification.service';
import { NotifyGateway } from '@module/gateway/notify.gateway';

@Injectable()
export class EventListener {
    constructor(
        private readonly notifyService: NotificationService,
        private readonly notifyGateway: NotifyGateway
    ) {}

    @OnEvent(LikePostEventName)
    likePostListener(event: LikePostEvent) {
        this.notifyService.create({
            user: convertToObjectId(event.user),
            source: {
                object: convertToObjectId(event.userLike),
                type: 'User',
            },
            destination: {
                object: convertToObjectId(event.post),
                type: 'Post',
            },
            type: LikePostEventName,
        });
    }

    @OnEvent(CommentPostEventName)
    commentPostListener(event: CommentPostEvent) {
        this.notifyService.create({
            user: convertToObjectId(event.user),
            source: {
                object: convertToObjectId(event.userComment),
                type: 'User',
            },
            destination: {
                object: convertToObjectId(event.post),
                type: 'Post',
            },
            type: CommentPostEventName,
        });
    }

    @OnEvent(NotifyEventName)
    sendNotification(event: NotifyEvent) {
        this.notifyGateway.emitNotify(event.notification);
    }
}
