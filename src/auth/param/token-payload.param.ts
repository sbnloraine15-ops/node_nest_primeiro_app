import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/auth.constanst";
import { Request } from "express";

export const TokenPayloadParam = createParamDecorator(
    (data: unknown, ctx:ExecutionContext) => {
        const context = ctx.switchToHttp()
        const request: Request = context.getRequest()


        console.log([REQUEST_TOKEN_PAYLOAD_NAME])
        return request[REQUEST_TOKEN_PAYLOAD_NAME]
        
    }
)