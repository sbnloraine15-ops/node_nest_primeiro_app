import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismasService } from 'src/prismas/prismas.service';
import { execSync } from 'node:child_process';
import * as dotenv from 'dotenv';
import { afterEach } from 'node:test';
import request from 'supertest';


dotenv.config({ path: 'env.test' })

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;
    let prismaService: PrismasService

    beforeAll(() => {
        execSync('npx prisma migrate deploy')
    })

    execSync('cross-env DATABASE_URL=file:./dev-test.db npx prisma migrate deploy')

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env.test'
                }),//carrega a variavel de ambiente emm todos os modulos  
                TasksModule,
                UsersModule,
                AuthModule,
            ],
        }).compile();

        app = module.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
        }))

        prismaService = module.get<PrismasService>(PrismasService)

        await app.init();

        //await prismaService.task.deleteMany().catch(() => {});
        await prismaService.user.deleteMany();

        //await prismaService.$executeRawUnsafe(`DELETE FROM sqlite_sequence WHERE name IN ('user', 'task');`).catch(() => {});
    });


    afterEach(async () => {

        await app.close()
    })



    describe('/create', () => {
        it('/create (POST) - createUser', async () => {
            const createUserDto = {
                name: 'Carol',
                email: 'carol@teste.com',
                password: '1234'
            }

            const response = await request(app.getHttpServer())
                .post('/users/create')
                .send(createUserDto)

            console.log(response.body)

            const userId = response.body.id

            console.log(userId)

            expect(response.body).toEqual({
                id: userId, name: 'Carol', email: 'carol@teste.com'
            })



        })

        it('/users (POST) - weak password', async () => {
            const createUserDto = {
                name: 'Carol',
                email: 'carol@teste.com',
                password: '123'
            }

            const response = await request(app.getHttpServer())
                .post('/users/create')
                .send(createUserDto)
                .expect(400)


            expect(response.body.message.message[0]).toEqual('password must be longer than or equal to 4 characters')
            console.log(response.body)

        })

        it('/user (PATCH) - updateUser', async () => {
            const createUserDto = {
                name: 'Carolina',
                email: 'carolina@teste.com',
                password: '1234'
            }

            const updateUser = {
                name: 'Carol Silva'
            }

            const user = await request(app.getHttpServer())
                .post('/users/create')
                .send(createUserDto)
                .expect(201)

            const auth = await request(app.getHttpServer())
                .post('/auth')
                .send({
                    email: createUserDto.email,
                    password: createUserDto.password

                })

            expect(auth.body.token).toEqual(auth.body.token)


            const response = await request(app.getHttpServer())
                .patch(`/users/${auth.body.id}`)
                .set("Authorization", `Bearer ${auth.body.token}`)
                .send(updateUser)

            expect(response.body).toEqual({
                id: auth.body.id,
                name: updateUser.name,
                email: createUserDto.email
            })




        })

        it('/delete (DELETE) - deleteUser', async () => {
            const createUserDto = {
                name: 'Carolina',
                email: 'carolina@teste.com',
                password: '1234'
            }

            const user = await request(app.getHttpServer())
                .post('/users/create')
                .send(createUserDto)
                .expect(201)


            const auth = await request(app.getHttpServer())
                .post('/auth')
                .send({
                    email: createUserDto.email,
                    password: createUserDto.password

                })

            expect(auth.body.token).toEqual(auth.body.token)

            const response = await request(app.getHttpServer())
            .delete(`/users/${auth.body.id}`)
            .set("Authorization", `Bearer ${auth.body.token}`)
            

            expect(response.body.message).toEqual('Usuario apagado');
            
        })
    })




});
