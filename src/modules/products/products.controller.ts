import { Controller, Get, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly appService: ProductsService) { }

  @Get()
  getAll(): Observable<Array<Product>> {
    return this.appService.getAll().pipe(
      map(res => res),
      catchError(err => of(err))
    )
  }

  @Post()
  createProduct(product): Observable<Product> {
    return this.appService.create(product).pipe(
      map(res => res),
      catchError(err => of(err))
    )
  }
}
