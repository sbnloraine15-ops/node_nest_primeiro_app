import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismasService } from 'src/prismas/prismas.service';
import { CreateUserDto } from './dtos/create.dto';
import { throwError } from 'rxjs';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { updateTaskDto } from 'src/tasks/dto/update-task.dto';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismasService,
        private readonly hashingService: HashingServiceProtocol
    ) { }

    async findOneUser(id: number) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id
            }, select: {
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

            const passwordHash = await this.hashingService.hash(createUserDto.password)


            const newUser = await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    passwordHash: passwordHash
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

    async update(id: number, updateUserDto: UpdateUserDto, TokenPayload: PayloadTokenDto) {

        try {
            const usersId = await this.prisma.user.findFirst({
                where: {
                    id: id
                },

            })
            if (!usersId) {
                throw new HttpException("Erro ao encontrar o usuario", HttpStatus.BAD_REQUEST)
            }

            if(usersId.id !== TokenPayload.sub){
                throw new HttpException("Acesso negado", HttpStatus.BAD_REQUEST)
            }

            const dataUser: { name?: string, passwordHash?: string } = {
                name: updateUserDto.name ? updateUserDto.name : usersId.name,
            }

            if (updateUserDto?.password) {
                const passwordHash = await this.hashingService.hash(updateUserDto?.password)
                dataUser['passwordHash'] = passwordHash
            }
            const UseUp = await this.prisma.user.update({
                where: {
                    id: usersId.id
                }, data: {
                    name: updateUserDto.name ? updateUserDto.name : usersId.name,
                    email: updateUserDto.email ? updateUserDto.email : usersId.email,
                    passwordHash: dataUser.passwordHash ? dataUser.passwordHash : usersId.passwordHash

                }, select: {
                    id: true,
                    name: true,
                    email: true
                }
            })
            return UseUp
        } catch (err) {
            throw new HttpException('Falha ao realizar a ação', HttpStatus.BAD_REQUEST)
        }

    }

    async delete(id: number, TokenPayload: PayloadTokenDto) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!user) {
                throw new HttpException("Erro ao encontrar o usuario", HttpStatus.BAD_REQUEST)
            }

            if(user.id !== TokenPayload.sub){
                throw new HttpException("Acesso negado", HttpStatus.BAD_REQUEST)
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
