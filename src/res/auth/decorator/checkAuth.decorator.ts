import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Response } from 'express';

export const checkAuth = createParamDecorator(
    (res: Response, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            res.redirect('/auth/google/cb');
        } else {
            return true;
        }
    },
);