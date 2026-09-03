import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import strict from "assert/strict";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import type { ConfigType } from "@nestjs/config";

import { REQUEST_TOKEN_PAYLOAD_NAME } from "../common/auth.constanst";

@Injectable()
export class AuthTokenGuard implements CanActivate{

    constructor(

        private readonly jwtservice: JwtService, 
        @Inject(jwtConfig.KEY)
        
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
     ){}

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenHearder(request)

        if(!token){
            throw new HttpException('Token não encontrado', HttpStatus.UNAUTHORIZED)
        }

        try{
            const payload = await this.jwtservice.verifyAsync(token, this.jwtConfiguration)

            request[REQUEST_TOKEN_PAYLOAD_NAME] = payload

        }catch(err){
            console.log(err)
            throw new UnauthorizedException("Acesso não autorizado")
        }
        
        return true; 

    }

    extractTokenHearder(request: Request) {
        const authorization = request.headers?.authorization

        if(!authorization || typeof authorization !== "string"){
            return
        }

        return authorization.split(' ')[1]; 
    }

}