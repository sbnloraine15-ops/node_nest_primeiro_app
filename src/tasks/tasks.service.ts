import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entittes/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

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

    findAll() {
        return this.tasks
    }

    findOne(id: string) {
        const task = this.tasks.find(task => task.id === Number(id))
        if (task) return task;

        throw new HttpException("Essa tarefa não existe", 404)
        //throw new NotFoundExcepition("Esta tarefa não existe")
    }

    create(createTaskdto: CreateTaskDto) {
        const newId = this.tasks.length + 1;

        const newTask = {
            id: newId,
            ...createTaskdto,
            completed: false, 
        }

        this.tasks.push(newTask)
    }

    update(id: string, updateTaskdto: updateTaskDto) {
        //a função devolve qual a posição e se existe
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if (taskIndex < 0) {
            throw new HttpException("Essa tarefa não existe.", HttpStatus.NOT_FOUND)
        }

        const taskItem = this.tasks[taskIndex]

        this.tasks[taskIndex] = {
            ...taskItem,
            ...updateTaskdto,
        }
        return "Tarefa Atualizada coom Sucesso"
    }

    delete(id: string) {
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))
        if (taskIndex < 0) {
            throw new HttpException("Essa tarefa não existe.", HttpStatus.NOT_FOUND)
        }

        this.tasks.splice(taskIndex, 1)

        return {
            message: "Tarefa excluida com sucesso"
        }
    }
}
