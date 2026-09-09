import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber, IsString, MinLength } from "class-validator";
/*
DTO > Data Trasfer Object(Objecto de trasferencia de dados)
    >Validar dados, trasformar dados.
    >Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha 
*/


export class CreateTaskDto{
    @ApiProperty({ description: 'Descrição da tarefa' })
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    readonly name!: string; 

    @ApiProperty({ description: 'Descrição da tarefa' })
    @IsString()
    @IsNotEmpty()
    readonly description!: string;
    
}