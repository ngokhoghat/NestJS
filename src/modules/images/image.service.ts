import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import MongodbGateway from 'src/database/gateways/mongodb';

import { Image } from './image.model';
import { constant } from 'src/utils';
import { from, Observable } from 'rxjs';

@Injectable()
export class ImagesService extends MongodbGateway<Image, string> {
  constructor(
    @Inject(constant.Schema.IMAGE_MODEL)
    private imageModel: Model<Image>,
  ) {
    super();
  }

  getAll(): Observable<Array<Image>> {
    return from(this.imageModel.find().exec()); // get all images
  }
  getById(id: string): Observable<Image> {
    return from(this.imageModel.findById({ _id: id })) // get image by id
  }
  getBy(param: string): Observable<Image[]> {
    throw new Error('Method not implemented.');
  }
  create(param: Image): Observable<Image> {
    return from(this.imageModel.create(param)); // create image
  }
  delete(id: string): Observable<Image> {
    return from(this.imageModel.deleteOne({ _id: id })); // delete image
  }
  update(param: Image): Observable<Image> {
    return from(this.imageModel.findOneAndUpdate(param.id, param)); // update image
  }
}