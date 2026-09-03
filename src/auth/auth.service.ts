import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SingInDto } from './dto/singin.dto';

import { PrismasService } from 'src/prismas/prismas.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismasService, 
        private readonly hashService: HashingServiceProtocol,

        @Inject(jwtConfig.KEY)
        private readonly jwtconfiguration: ConfigType<typeof jwtConfig>, 
        private readonly jwtService: JwtService
    ){}

    async authenticate(singInDto: SingInDto){
      const user = await this.prisma.user.findFirst({
        where:{
            email: singInDto.email, 
            
        }
      })

      if(!user){
        throw new HttpException('Falha no login', HttpStatus.UNAUTHORIZED)
      }

      const passwordValid = await this.hashService.compare(singInDto.password, user.passwordHash)

      if(!passwordValid){
        throw new HttpException('Senha invalida', HttpStatus.UNAUTHORIZED)
      }

      const token = await this.jwtService.signAsync(
        {
          sub: user.id, 
          email: user.email
        }, 
        {
          secret: this.jwtconfiguration.secret, 
          audience: this.jwtconfiguration.audience,
          issuer: this.jwtconfiguration.issuer,
          expiresIn: this.jwtconfiguration.JwtTtl as any
        }
      )

      return{
        id: user.id,
        name: user.name, 
        email: user.email,
        token: token
      }
    }
}
