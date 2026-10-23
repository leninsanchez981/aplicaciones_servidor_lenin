
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { PedidosModule } from './pedidos/pedidos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
