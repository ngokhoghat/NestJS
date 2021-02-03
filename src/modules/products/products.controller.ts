import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleErrorRequest, handleSuccessRequest } from 'src/database/gateways/mongodb';

import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly appService: ProductsService) { }

  @Get()
  getAll(): Observable<Array<Product> | any> {
    return this.appService.getAll().pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
  
  @Get(':id')
  getById(@Param() params): Observable<Array<Product> | any> {
    return this.appService.getById(params.id).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
  
  @Delete(':id')
  deleteProduct(@Param() params): Observable<Array<Product> | any> {
    return this.appService.delete(params.id).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Post()
  createProduct(@Body() product): Observable<Product | any> {
    return this.appService.create(product).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
}
