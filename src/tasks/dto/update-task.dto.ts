// import { IsBoolean, IsOptional, IsString } from "class-validator";

import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsBoolean, IsOptional } from "class-validator";

// export class updateTaskDto {
//     @IsString()
//     @IsOptional()
//     readonly name?: string;

//     @IsString()
//     @IsOptional()
//     readonly description?: string;

//     @IsOptional()
//     @IsBoolean()
//     readonly completed?: boolean

// }

export class updateTaskDto extends PartialType(CreateTaskDto) {

    @IsOptional()
    @IsBoolean()
    readonly completed?: boolean
}