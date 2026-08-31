import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/* 
.module. - modulo principal
.controller.ts - Define as rotas e lida com as requisições
.service.ts: contem a lógica de negocio, separado do controler 
*/

//Arquivo que inicia o projeto.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //remove as chaves que não estão no dto(remove propiedades que não existe)
    //transform: true, faz traformação no serviço, então se é string e quero receber como number, ele funciona. mas aplica global, então pode dar erro 
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
