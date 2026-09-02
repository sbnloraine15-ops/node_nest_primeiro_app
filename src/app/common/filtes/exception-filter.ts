import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class ApiExcepitionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()//MANIPULAR RESPOSTA
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        const errorResposne = exception.getResponse();

        console.log('Passando pelo filtro')

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: errorResposne !== "" ? errorResposne : "Erro ao realizar essa operação.",
            path: request.url
        })
    }

}