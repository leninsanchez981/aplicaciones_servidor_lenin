import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { AppService } from './app.service.js';

@Controller('usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  crearUsuario() {
    return this.appService.crearUsuario();
  }

  @Get()
  obtenerUsuarios() {
    return this.appService.obtenerUsuarios();
  }

  @Get(':id')
  obtenerUsuario() {
    return this.appService.obtenerUsuario();
  }

  @Put(':id')
  actualizarUsuario() {
    return this.appService.actualizarUsuario();
  }

  @Patch(':id')
  actualizarParcialUsuario() {
    return this.appService.actualizarParcialUsuario();
  }

  @Delete(':id')
  eliminarUsuario() {
    return this.appService.eliminarUsuario();
  }
}