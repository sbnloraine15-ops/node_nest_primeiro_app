import { ApiProperty } from '@nestjs/swagger';

export class ResponseTaskDto {
    @ApiProperty({ example: 'Estudar NestJS e Swagger' })
    name!: string;

    @ApiProperty({ example: 'Criar rotas, DTOs e documentar a API' })
    description!: string; 

    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: false })
    completed!: boolean; 

    @ApiProperty({ example: '2026-09-09T16:00:00.000Z', required: false })
    createdAt?: Date;

    @ApiProperty({ example: 1, nullable: true })
    UserId!: number | null;
}