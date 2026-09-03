import { Body, Controller, Post } from '@nestjs/common';
import { SingInDto } from './dto/singin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post() 
    async singIn(@Body() singInDto: SingInDto){
        return this.authService.authenticate(singInDto)
    }
}
