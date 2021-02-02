import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Schema } from 'src/utils/constant';

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.']
  },
  price: {
    type: Number,
    required: [true, 'Price is required.']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.']
  },
  status: {
    type: String,
    required: [true, 'Status is required.'],
    enum: ['inStock', 'outStock']
  },
  currency: {
    type: String,
    default: "$"
  }
});


export const ProductsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [Schema.DATABASE_CONNECTION],
  },
];