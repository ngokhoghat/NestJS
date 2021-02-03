import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Schema } from 'src/utils/constant';

export const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required.'],
    },
    imageLink: {
      type: String,
      required: [true, 'Image link is required.']
    },
  },
  {
    timestamps: true
  }
);


export const ImageProviders = [
  {
    provide: Schema.IMAGE_MODEL,
    useFactory: (connection: Connection) => connection.model('Images', ImageSchema),
    inject: [Schema.DATABASE_CONNECTION],
  },
];