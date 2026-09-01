//controller - responsavel por receber a requisição, ele vai ver qual logica esta sendo chamada e devolve a resposta

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/app/common/dto/pagination.dto';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { BodyCreatInterceptor } from './interceptors/body-create-task.inteceptor';

@Controller('tasks')
@UseInterceptors(LoggerInterceptor)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    findAllTasks(@Query() paginationDto: PaginationDto) {
        console.log(paginationDto)
        return this.tasksService.findAll()
    }

    @Get(':data')
    buscaDate(@Param("data") data: string) {
        return this.tasksService.LocalDate((data))

    }

    @Get(":id")
    findOneTask(@Param('id') id: string) {
        console.log(id)
        return this.tasksService.findOne(Number(id))
    }

    @UseInterceptors(BodyCreatInterceptor)
    @Post("/create")
    createTask(@Body() createTaskDto: CreateTaskDto) {
        //passa o create aqui para receber as informações necessárias para criação
        return this.tasksService.create(createTaskDto)

    }

    @Patch(":id")
    updateTask(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: updateTaskDto) {

        return this.tasksService.update(id, updateTaskDto)

    }

    @Delete(":id")
    deleteTask(@Param("id", ParseIntPipe) id: number) {
        return this.tasksService.delete(id)
    }


}
