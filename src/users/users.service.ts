import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismasService } from 'src/prismas/prismas.service';
import { CreateUserDto } from './dtos/create.dto';
import { throwError } from 'rxjs';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismasService) { }

    async findOneUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            },select: {
                id: true,
                name: true,
                email: true, 
                Task: true
            }
        })
        if (user) return user;

        throw new HttpException('Usuario Não encontrado', HttpStatus.BAD_REQUEST)
    }

    async create(createUserDto: CreateUserDto) {

        try {
            const newUser = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    passwordHash: createUserDto.password
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            return newUser
        } catch (err) {
            throw new HttpException('Falha ao cadastrar', HttpStatus.BAD_REQUEST)
        }

    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const usersId = await this.prisma.user.findFirst({
            where: {
                id: id
            },

        })
        if (!usersId) {
            throw new HttpException("Erro ao encontrar o usuario", HttpStatus.BAD_REQUEST)
        }
        const UseUp = await this.prisma.user.update({
            where: {
                id: usersId.id
            }, data: {
                name: updateUserDto.name ? updateUserDto.name : usersId.name,
                email: updateUserDto.email ? updateUserDto.email : usersId.email,
                passwordHash: updateUserDto.password ? updateUserDto.password : usersId.passwordHash

            }, select: {
                id: true,
                name: true,
                email: true
            }
        })
        return UseUp

    }

    async delete(id: number) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!user) {
                throw new HttpException("Erro ao encontrar o usuario", HttpStatus.BAD_REQUEST)
            }

            const userEncontrado = await this.prisma.user.delete({
                where: {
                    id: user.id
                }
            })

            return {
                message: "Usuario apagado"
            }

        } catch (err) {
            throw new HttpException("Erro ao deletar o usuario", HttpStatus.BAD_REQUEST)
        }


    }

}
