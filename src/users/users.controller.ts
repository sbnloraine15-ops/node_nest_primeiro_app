import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthTokenGuard } from 'src/auth/gurard/auth-token';
import { TokenPayloadParam } from 'src/auth/param/token-payload.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'




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
        @TokenPayloadParam() TokenPayload: PayloadTokenDto
    ) {

        console.log('payload recebido', TokenPayload)

        return this.userService.update(id, updateUserDto, TokenPayload)
    }

    @UseGuards(AuthTokenGuard)
    @Delete(':id')
    deleteUser(
        @Param('id', ParseIntPipe) id: number,
        @TokenPayloadParam() TokenPayload: PayloadTokenDto) {
        return this.userService.delete(id,TokenPayload)

    }

    @UseGuards(AuthTokenGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    async uploadAvatar(
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
    @UploadedFile(  new ParseFilePipeBuilder().addMaxSizeValidator({
        maxSize: 1*(1024*1024)
    }).build({errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY})) file: Express.Multer.File
  ) {

    const mimeType = file.mimetype;
   
    const fileExtension =  path.extname(file.originalname).toLowerCase().substring(1)
     //console.log(mimeType)
     //console.log(fileExtension)
     
     const fileName = `${tokenPayload.sub}.${fileExtension}`
     //console.log(fileName)

     const fileLocale = path.resolve(process.cwd(),'files', fileName )

     await fs.writeFile(fileLocale, file.buffer)
    
        return true
    }

}
