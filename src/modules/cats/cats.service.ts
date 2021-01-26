import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Document } from 'mongoose';

import firebase from "firebase/app";
import "firebase/storage";
export interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,
  ) { }

  async create(createCatDto: any): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    // const storageRef = firebase.storage().ref();

    // console.log(storageRef);

    return this.catModel.find().exec();
  }
}