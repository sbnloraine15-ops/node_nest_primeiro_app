import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { PrismasService } from 'src/prismas/prismas.service';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [PrismasService, CategoryService]
})
export class CartegoryModule { }
