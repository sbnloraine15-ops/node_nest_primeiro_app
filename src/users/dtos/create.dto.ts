import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string
    
    @IsEmail()
    @IsString()
    email!: string

    @IsString()
    @MinLength(4)
    password!: string 
    

}