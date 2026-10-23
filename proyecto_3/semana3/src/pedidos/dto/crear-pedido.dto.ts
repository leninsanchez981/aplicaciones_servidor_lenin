
import { IsInt, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CrearPedidoDto {
  @IsString()
  @IsNotEmpty()
  cliente: string;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsInt()
  @IsPositive()
  productoId: number;
}
