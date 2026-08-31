import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismasModule } from 'src/prismas/prismas.module';

@Module({
  imports: [PrismasModule], 
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
