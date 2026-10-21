
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    nombre: string;
    descripcion: string;
    precio: number;
  }) {
    return this.prisma.producto.create({
      data,
    });
  }

  findAll() {
    return this.prisma.producto.findMany();
  }

  findOne(id: number) {
    return this.prisma.producto.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
    },
  ) {
    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.producto.delete({
      where: { id },
    });
  }
}
