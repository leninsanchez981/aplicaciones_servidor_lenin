/*
  Warnings:

  - Added the required column `cliente` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- Añadir cliente temporalmente como opcional
ALTER TABLE "Pedido" ADD COLUMN "cliente" TEXT;

-- Asignar un cliente a los pedidos existentes
UPDATE "Pedido"
SET "cliente" = 'Cliente anterior'
WHERE "cliente" IS NULL;

-- Convertir cliente en obligatorio
ALTER TABLE "Pedido" ALTER COLUMN "cliente" SET NOT NULL;

-- Añadir inventario a los productos
ALTER TABLE "Producto"
ADD COLUMN "stock" INTEGER NOT NULL DEFAULT 0;