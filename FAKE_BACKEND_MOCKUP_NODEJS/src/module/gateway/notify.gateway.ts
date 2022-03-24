import { PostService } from '@module/post/post.service';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import EventGateway from './event.gateway';

@WebSocketGateway(9001, {
    cors: {
        origin: '*',
    },
})
export class NotifyGateway {
    @WebSocketServer()
    server: Server;

    emitNotify(notify: any) {
        this.server.emit(EventGateway.Notify, {
            notification: notify,
        });
    }
}
