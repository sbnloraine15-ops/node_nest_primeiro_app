import { ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, Max, Min } from "class-validator"

export class PaginationDto {
    @ApiPropertyOptional({
        description: 'Limite de registros retornados por página',
        default: 10,
        maximum: 50,
        minimum: 0
    })
    @IsOptional()
    @IsInt()
    @Max(50)
    @Min(0)
    @Type(() => Number)
    limit?: number

    @ApiPropertyOptional({
        description: 'Número de registros a serem pulados (offset)',
        default: 0,
        minimum: 0
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    offset?: number
}