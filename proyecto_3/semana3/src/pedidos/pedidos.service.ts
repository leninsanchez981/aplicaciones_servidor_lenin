
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CrearPedidoDto } from './dto/crear-pedido.dto.js';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un pedido
  async crear(dto: CrearPedidoDto) {
    // 1. Comprobar que el producto exista
    const producto = await this.prisma.producto.findUnique({
      where: { id: dto.productoId },
    });

    if (!producto) {
      throw new UnprocessableEntityException(
        'El producto indicado no existe',
      );
    }

    // 2. Comprobar que la cantidad sea válida
    if (dto.cantidad <= 0) {
      throw new UnprocessableEntityException(
        'La cantidad debe ser mayor que cero',
      );
    }

    // 3. Comprobar que haya inventario suficiente
    if (dto.cantidad > producto.stock) {
      throw new UnprocessableEntityException(
        'No hay suficiente inventario para realizar el pedido',
      );
    }

    // 4. Evitar pedidos pendientes duplicados
    const pedidoPendiente = await this.prisma.pedido.findFirst({
      where: {
        cliente: {
          equals: dto.cliente,
          mode: 'insensitive',
        },
        productoId: dto.productoId,
        estado: 'pendiente',
      },
    });

    if (pedidoPendiente) {
      throw new ConflictException(
        'El cliente ya tiene un pedido pendiente de este producto',
      );
    }

    // 5. Crear el pedido y descontar el inventario
    return this.prisma.$transaction(async (tx) => {
      // Verificar y descontar stock de forma atómica
      const actualizacion = await tx.producto.updateMany({
        where: {
          id: dto.productoId,
          stock: { gte: dto.cantidad },
        },
        data: {
          stock: { decrement: dto.cantidad },
        },
      });

      if (actualizacion.count === 0) {
        throw new UnprocessableEntityException(
          'No hay suficiente inventario para realizar el pedido',
        );
      }

      return tx.pedido.create({
        data: {
          cliente: dto.cliente,
          cantidad: dto.cantidad,
          productoId: dto.productoId,
        },
        include: {
          producto: true,
        },
      });
    });
  }

  // Listar todos los pedidos
  async listar() {
    return this.prisma.pedido.findMany({
      include: {
        producto: true,
      },
    });
  }

  // Buscar un pedido por su ID
  async buscarPorId(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        producto: true,
      },
    });

    if (!pedido) {
      throw new NotFoundException('El pedido no existe');
    }

    return pedido;
  }
}
