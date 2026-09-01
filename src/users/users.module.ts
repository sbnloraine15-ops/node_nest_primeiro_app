import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismasService } from 'src/prismas/prismas.service';

@Module({
  imports: [], 
  controllers: [UsersController],
  providers: [UsersService, PrismasService]
})
export class UsersModule {}
