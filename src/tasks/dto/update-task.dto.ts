import { IsBoolean, IsOptional, IsString } from "class-validator";

export class updateTaskDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsOptional()
    @IsBoolean()
    readonly completed?: boolean

}