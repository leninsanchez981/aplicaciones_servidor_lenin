import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PedidosController } from './pedidos.controller.js';
import { PedidosService } from './pedidos.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RegistroMiddleware } from '../registro/registro.middleware.js';

@Module({
  imports: [PrismaModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RegistroMiddleware)
      .forRoutes({ path: 'pedidos', method: RequestMethod.ALL });
  }
}