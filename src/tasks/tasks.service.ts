//resposavel pela lógica pesada.

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entittes/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { PrismasService } from 'src/prismas/prismas.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismasService) { }

    private tasks: Task[] = [
        {
            id: 1,
            name: "Realizar atividades de aprendizado",
            description: "Fixar conteudo",
            completed: false,
        },

        {
            id: 2,
            name: "intem dois da lista",
            description: "item 3 da lista",
            completed: false,
        }
    ]

    async findAll() {
        const allTasks = await this.prisma.task.findMany()
        return allTasks
    }

    async findOne(id: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: id
            }
        })
        if (task?.name) return task;

        throw new HttpException("Essa tarefa não existe", 404)
        //throw new NotFoundExcepition("Esta tarefa não existe")
    }

    async create(createTaskdto: CreateTaskDto) {
        const newTask = await this.prisma.task.create({
            data: {
                name: createTaskdto.name,
                description: createTaskdto.description,
                completed: false
            }
        })

        return newTask
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
        }catch(err){
            throw new HttpException('Falha ao deletar essa tarefa', HttpStatus.BAD_REQUEST)
        }


    }
}
