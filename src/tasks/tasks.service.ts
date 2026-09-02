//resposavel pela lógica pesada.

import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { Task } from './entittes/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { PrismasService } from 'src/prismas/prismas.service';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Injectable()

export class TasksService {
    constructor(private prisma: PrismasService) { }



    async findAll(paginationDto?: PaginationDto) {
        console.log("Rotas")
        const limit = paginationDto?.limit ?? 10;
        const offset = paginationDto?.offset ?? 0;
        const allTasks = await this.prisma.task.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                CreatedAt: "desc"
            }
        })
        return allTasks
    }

    async LocalDate(data: string) {

        try {
            // Quebra a string "2026-08-31" em partes
            const [ano, mes, dia] = data.split('-').map(Number);

            // Cria a data usando o horário local (mês começa em 0 no JS, por isso mes - 1)
            const inicioDoDia = new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
            const fimDoDia = new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999));

            const dateTask = await this.prisma.task.findMany({
                where: {
                    CreatedAt: {
                        gte: inicioDoDia,
                        lte: fimDoDia,
                    }
                }
            });

            if (!dateTask || dateTask.length === 0) {
                throw new HttpException("Nenhuma data encontrada", HttpStatus.BAD_REQUEST)
            }

            return dateTask
        }catch(err){
            throw new HttpException("Erro ao realizar essa operação", HttpStatus.BAD_REQUEST)
        }

    }

    async findOne(id: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })
        if (task?.name) return task;

        throw new HttpException("Essa tarefa não existe", HttpStatus.BAD_REQUEST)
        //throw new NotFoundExcepition("Esta tarefa não existe")
    }

    async create(createTaskdto: CreateTaskDto) {
        try {
            const newTask = await this.prisma.task.create({
                data: {
                    name: createTaskdto.name,
                    description: createTaskdto.description,
                    completed: false,
                    UserId: createTaskdto.UserId
                }
            })

            return newTask
        } catch (err) {
            throw new HttpException('Falha ao criar essa tarefa', HttpStatus.BAD_REQUEST)

        }
    }

    async update(id: number, updateTaskdto: updateTaskDto) {

        const findTask = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })
        if (!findTask) {
            throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND)
        }

        const task = await this.prisma.task.update({
            where: {
                id: findTask.id
            },
            data: updateTaskdto
        })

        return task

    }

    async delete(id: number) {
        try {
            const findTask = await this.prisma.task.findFirst({
                where: {
                    id: id
                }
            })
            if (!findTask) {
                throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND)
            }

            await this.prisma.task.delete({
                where: {
                    id: findTask.id
                }

            })

            return {
                message: "tarefa deletada com sucesso"
            }
        } catch (err) {
            throw new HttpException('Falha ao deletar essa tarefa', HttpStatus.BAD_REQUEST)
        }


    }


}
