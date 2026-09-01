import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";

@Injectable()
export class BodyCreatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const resquest = context.switchToHttp().getRequest(); 
        const method = resquest.method
        const url = resquest.url 
        const body = resquest.body

        console.log(`[REQUEST] ${method} ${url}`)
        //mostra oq ta mandando no body
        console.log(`[BODY] ${JSON.stringify(body, null, 2)}`)

        return next.handle()

    }

}