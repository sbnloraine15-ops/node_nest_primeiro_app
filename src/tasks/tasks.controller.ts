//controller - responsavel por receber a requisição, ele vai ver qual logica esta sendo chamada e devolve a resposta

import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService ){}

    @Get()
    findAllTasks(){
        console.log()
        return this.tasksService.findAll()
    }

    @Get(":id")
    findOneTask(@Param('id') id: string){
        console.log(id)
        return this.tasksService.findOne(id)
    }

    @Post("/create")
    createTask(@Body() createTaskDto: CreateTaskDto){
        //passa o create aqui para receber as informações necessárias para criação
        return this.tasksService.create(createTaskDto)

    }

    @Patch(":id")
    updateTask(@Param("id") id: string, @Body() updateTaskDto: updateTaskDto){
    
        return this.tasksService.update(id, updateTaskDto)

    }

    @Delete(":id")
    deleteTask(@Param("id")id: string){
        return this.tasksService.delete(id)
    }
}
