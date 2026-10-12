
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { productos } from './BaseDatos.js';
import { Producto } from './entities/producto.entity.js';

@Injectable()
export class ProductsService {
  create(createProductoDto: CreateProductoDto) {
    const producto = new Producto(
      createProductoDto.nombre,
      createProductoDto.precio,
      createProductoDto.id,
      createProductoDto.descripcion,
    );

    productos.push(producto);
    return producto;
  }

  findAll() {
    return productos;
  }

  findOne(id: number) {
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return producto;
  }

  remove(id: number) {
    const indice = productos.findIndex((p) => p.id === id);

    if (indice === -1) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }

    return productos.splice(indice, 1)[0];
  }
}
