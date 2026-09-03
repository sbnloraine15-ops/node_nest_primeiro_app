import { Global, Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismasModule } from 'src/prismas/prismas.module';
import { PrismasService } from 'src/prismas/prismas.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';


//modulo global, pode ser usado na aplicação inteira(Não precisa importar em outros modulos pra usar )
@Global()
@Module({
    imports: [
        PrismasModule, 
        ConfigModule.forFeature(jwtConfig), 
        JwtModule.registerAsync(jwtConfig.asProvider())
    ], 
    providers: [
        {
            provide: HashingServiceProtocol, 
            useClass: BcryptService
        },
        AuthService
    ], 
    exports: [
        HashingServiceProtocol, 
        JwtModule, 
        ConfigModule
    ], controllers: [AuthController]
})
export class AuthModule {}
