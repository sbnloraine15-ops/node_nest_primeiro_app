import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
    createTask(@Body() body: any){
        console.log("tarefa criada")
        return this.tasksService.create(body)

    }

    @Patch(":id")
    updateTask(@Param("id") id: string, @Body() body: any){
        console.log(id)
        console.log(body)
        return "atualizando tafefas"

    }
}
