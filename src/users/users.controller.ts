import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthTokenGuard } from 'src/auth/gurard/auth-token';
import { REQUEST_TOKEN_PAYLOAD_NAME } from 'src/auth/common/auth.constanst';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }



    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {


        return this.userService.findOneUser(Number(id))
    }

    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)

    }

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    upadateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto, 
        @Req() req: Request
    ) {

        console.log(req[REQUEST_TOKEN_PAYLOAD_NAME])

        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)

    }

}
