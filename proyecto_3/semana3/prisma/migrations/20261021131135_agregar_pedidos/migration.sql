-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "cantidad" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
