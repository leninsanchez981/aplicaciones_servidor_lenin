
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RegistroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const inicio = Date.now();

    res.on('finish', () => {
      const duracion = Date.now() - inicio;

      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duracion} ms)`,
      );
    });

    next();
  }
}
