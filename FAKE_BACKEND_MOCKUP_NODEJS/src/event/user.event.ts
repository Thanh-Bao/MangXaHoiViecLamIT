import BaseEvent from './base.event';

export const UserFollowEventName: string = 'user.follow';

export class UserFollowEvent implements BaseEvent {
    readonly eventName = UserFollowEventName;

    user: string;
    userFollow: string;
}
