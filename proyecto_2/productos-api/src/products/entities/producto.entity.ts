
export class Producto {
  nombre: string;
  precio: number;
  id: number;
  descripcion: string;

  constructor(
    nombre: string,
    precio: number,
    id: number,
    descripcion: string,
  ) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.descripcion = descripcion;
  }
}
