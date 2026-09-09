// import { IsBoolean, IsOptional, IsString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class updateTaskDto {
    @ApiProperty({name: 'nome da tarefa'})
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiProperty({description: 'Descrição da tarefa'})
    @IsString()
    @IsOptional()
    readonly description?: string;

    @ApiProperty({ required: false})
    @IsOptional()
    @IsBoolean()
    readonly completed?: boolean

}

// export class updateTaskDto extends PartialType(CreateTaskDto) {

//     @IsOptional()
//     @IsBoolean()
//     readonly completed?: boolean
// }