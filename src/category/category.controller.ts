import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('')
    findAllCategory() {
        return this.categoryService.findAll()
    }

    @Post('/create')
    create(@Body() categoryDto: CategoryDto) {
        return this.categoryService.createPerfil(categoryDto)
    }
}
