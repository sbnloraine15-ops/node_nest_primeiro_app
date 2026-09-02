import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthAdiminGuard } from './common/guards/adimin.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),//carrega a variavel de ambiente emm todos os modulos  
    TasksModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService
    //{
    //   provide: APP_GUARD, 
    //   useClass: AuthAdiminGuard
    // },
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
  }
}
