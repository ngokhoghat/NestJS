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
    return from(this.productModel.find().exec()); // get all products
  }
  getById(id: string): Observable<Product> {
    return from(this.productModel.findById({ _id: id })) // get product by id
  }
  getBy(param: string): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  create(param: Product): Observable<Product> {
    return from(this.productModel.create(param)); // create product
  }
  delete(id: string): Observable<Product> {
    return from(this.productModel.deleteOne({ _id: id })); // delete product
  }
  update(param: Product): Observable<Product> {
    return from(this.productModel.findOneAndUpdate(param.id, param)); // update product
  }
}