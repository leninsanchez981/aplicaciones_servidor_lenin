import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  crearUsuario() {
    return {
      mensaje: 'Usuario creado correctamente',
    };
  }

  obtenerUsuarios() {
    return {
      mensaje: 'Usuarios obtenidos correctamente',
    };
  }

  obtenerUsuario() {
    return {
      mensaje: 'Usuario obtenido correctamente',
    };
  }

  actualizarUsuario() {
    return {
      mensaje: 'Usuario actualizado correctamente',
    };
  }

  actualizarParcialUsuario() {
    return {
      mensaje: 'Usuario actualizado parcialmente correctamente',
    };
  }

  eliminarUsuario() {
    return {
      mensaje: 'Usuario eliminado correctamente',
    };
  }
}