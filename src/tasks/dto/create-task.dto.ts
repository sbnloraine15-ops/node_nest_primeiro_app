/*
DTO > Data Trasfer Object(Objecto de trasferencia de dados)
    >Validar dados, trasformar dados.
    >Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha 
*/

export class CreateTaskDto{
    readonly name!: string; 
    readonly description!: string; 
}