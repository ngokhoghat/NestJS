import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import MongodbGateway from 'src/database/gateways/mongodb';

import { Post } from './post.model';
import { constant } from 'src/utils';
import { from, Observable } from 'rxjs';

@Injectable()
export class PostsService extends MongodbGateway<Post, string> {
  constructor(
    @Inject(constant.Schema.POST_MODEL)
    private postModel: Model<Post>,
  ) {
    super();
  }

  getAll(): Observable<Array<Post>> {
    return from(this.postModel.find().exec()); // get all products
  }
  getById(id: string): Observable<Post> {
    return from(this.postModel.findById({ _id: id })) // get product by id
  }
  getBy(param: string): Observable<Post[]> {
    throw new Error('Method not implemented.');
  }
  create(param: Post): Observable<Post> {
    return from(this.postModel.create(param)); // create product
  }
  delete(id: string): Observable<Post> {
    return from(this.postModel.deleteOne({ _id: id })); // delete product
  }
  update(param: Post): Observable<Post> {
    return from(this.postModel.findOneAndUpdate(param.id, param)); // update product
  }
}