import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import MongodbGateway from 'src/database/gateways/mongodb';

import { Product } from './products.model';
import { constant } from 'src/utils';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProductsService extends MongodbGateway<Product, string> {
  constructor(
    @Inject(constant.Schema.PRODUCT_MODEL)
    private productModel: Model<Product>,
  ) {
    super();
  }

  getAll(): Observable<Array<Product>> {
    return from(this.productModel.find().exec());
  }
  getById(): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  getBy(param: string): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  create(product: Product): Observable<Product> {
    return from(this.productModel.create(product));
  }
  delete(param: string): Observable<Product> {
    throw new Error('Method not implemented.');
  }
}