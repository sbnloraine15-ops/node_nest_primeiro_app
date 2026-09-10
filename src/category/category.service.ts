import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismasService } from 'src/prismas/prismas.service';
import { CategoryDto } from './dtos/category.dto';


//categori vai ter doi tipos por enquanto usuario e adm
//usuario so vai editar coisas do seu login e não podera se deletar 
//admin pode editar o dele e o dos outros 
//edição pelo adimim fica marcada 
@Injectable()
export class CategoryService {
    constructor(private prisma: PrismasService) { }

    async findAll() {
        const find = await this.prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        })
    }

    async createPerfil(categoryDto: CategoryDto) {
        try {
            const newCategoy = await this.prisma.category.create({
                data: {
                    name: categoryDto.name
                }
            })

            return newCategoy
        } catch (err) {
            throw new HttpException('Falha ao criar perfil', HttpStatus.BAD_REQUEST)
        }
    }
}
