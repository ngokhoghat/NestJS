import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleErrorRequest } from 'src/database/gateways/mongodb';

import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly appService: ProductsService) { }

  @Get()
  getAll(): Observable<Array<Product> | any> {
    return this.appService.getAll().pipe(
      map(res => res),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
  
  @Get(':id')
  getById(@Param() params): Observable<Array<Product> | any> {
    return this.appService.getById(params.id).pipe(
      map(res => res),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Post()
  createProduct(@Body() product): Observable<Product | any> {
    return this.appService.create(product).pipe(
      map(res => res),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
}
