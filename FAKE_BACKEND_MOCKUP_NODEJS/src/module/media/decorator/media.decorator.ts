import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MediaRecord = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        
        return request.mediaDocument;
    },
)