import { NotificationDocument } from '@module/notification/notification.schema';
import { LeanDocument } from 'mongoose';
import BaseEvent from './base.event';

export const NotifyEventName: string = 'notification.new';

export class NotifyEvent implements BaseEvent {
    readonly eventName = NotifyEventName;

    constructor(notification: Object, user: string) {
        this.notification = notification;
        this.user = user;
    }

    notification: Object;
    user: string;
}
