import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        
        const resquest = context.switchToHttp().getRequest()
        const method = resquest.method
        const url = resquest.url; 
        const now = Date.now()

        console.log(`[REQUEST] ${method} ${url}- Inicio da Req`)

        return next.handle().pipe(
            tap(()=> console.log(`[RESPONSE] ${method} ${url} - ${Date.now() - now}ms`))
        )

    }
}
