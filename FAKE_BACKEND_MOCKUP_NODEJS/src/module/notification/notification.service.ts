import { convertToObjectId } from '@lib/helper/uuid';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotifyEvent, NotifyEventName } from 'src/event/notify.event';
import { NotificationDocument, Notification } from './notification.schema';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) public notiticationModel: Model<NotificationDocument>,
        private eventEmitter: EventEmitter2
    ) {}

    create(data: any) {
        return new Promise((resolve, reject) => {
            const query = new this.notiticationModel(data);

            query
                .save()
                .then((record) =>
                    record.populate([
                        {
                            path: 'destination.object',
                            model: 'Post',
                            select: { _id: 1, content: 1 },
                        },
                        {
                            path: 'source.object',
                            model: 'User',
                            select: { _id: 1, username: 1, avatar: 1 },
                        },
                        ,
                    ])
                )
                .then((record) => {
                    this.eventEmitter.emit(NotifyEventName, new NotifyEvent(record, data.user));
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getByUser(userId: string, condition: any = {}) {
        return new Promise((resolve, reject) => {
            const query = this.notiticationModel
                .find({
                    ...condition,
                    user: convertToObjectId(userId),
                })
                .populate([
                    {
                        path: 'destination.object',
                        model: 'Post',
                        select: { _id: 1, content: 1 },
                    },
                    {
                        path: 'source.object',
                        model: 'User',
                        select: { _id: 1, username: 1, avatar: 1 },
                    },
                    ,
                ])
                .sort({ _id: -1 })
                .lean();

            query
                .exec()
                .then((record) => {
                    resolve(record);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    update(condition: any, payload: any) {
        return new Promise((resolve, reject) => {
            const query = this.notiticationModel
                .findOneAndUpdate(condition, payload, { new: true })
                .lean();

            query
                .exec()
                .then((notify) => {
                    resolve(notify);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    readAll() {
        return new Promise((resolve, reject) => {
            const query = this.notiticationModel
                .updateMany(
                    {
                        isRead: false,
                    },
                    {
                        isRead: true,
                    }
                )
                .lean();

            query
                .exec()
                .then((notify) => {
                    resolve(notify);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
