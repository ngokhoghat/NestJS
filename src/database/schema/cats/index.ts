import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { constant } from 'src/utils';

export const ProductSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});


export const ProductProviders = [
  {
    provide: constant.Schema.CAT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [constant.Schema.CAT_MODEL],
  },
];