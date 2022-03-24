import BaseEvent from './base.event';

export const CommentPostEventName: string = 'comment.post';

export class CommentPostEvent implements BaseEvent {
    readonly eventName = CommentPostEventName;

    constructor(user: string, post: string, userComment: string) {}

    user: string;
    post: string;
    userComment: string;
}

export const LikePostEventName: string = 'like.post';

export class LikePostEvent implements BaseEvent {
    readonly eventName = LikePostEventName;

    constructor(user: string, post: string, userLike: string) {
        this.user = user;
        this.post = post;
        this.userLike = userLike;
    }

    user: string;
    post: string;
    userLike: string;
}
