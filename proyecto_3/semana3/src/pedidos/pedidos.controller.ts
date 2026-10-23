import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service.js';
import { CrearPedidoDto } from './dto/crear-pedido.dto.js';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  crear(@Body() dto: CrearPedidoDto) {
    return this.pedidosService.crear(dto);
  }

  @Get()
  listar() {
    return this.pedidosService.listar();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.buscarPorId(id);
  }
}