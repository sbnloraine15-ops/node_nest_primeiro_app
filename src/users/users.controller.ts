import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}



    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findAllUser(Number (id))
    }

    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)

    }

    @Patch(':id')
    upadateUser(@Param('id', ParseIntPipe)id: number, @Body() updateUserDto: UpdateUserDto){
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
        deleteUseer(@Param('id', ParseIntPipe)id: number){

        }
    
}
