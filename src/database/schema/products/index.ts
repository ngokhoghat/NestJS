import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { constant } from 'src/utils';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is reuire'] },
  age: Number,
  breed: String,
});


export const ProductsProviders = [
  {
    provide: constant.Schema.PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [constant.Schema.DATABASE_CONNECTION],
  },
];