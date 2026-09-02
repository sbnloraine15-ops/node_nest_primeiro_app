import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismasModule } from 'src/prismas/prismas.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExcepitionFilter } from 'src/app/common/filtes/exception-filter';

@Module({
  imports: [PrismasModule], 
  controllers: [TasksController],
  providers: [TasksService, {
    provide: APP_FILTER, 
    useClass: ApiExcepitionFilter
  }]
})
export class TasksModule {}
