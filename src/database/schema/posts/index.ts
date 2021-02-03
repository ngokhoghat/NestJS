import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Schema } from 'src/utils/constant';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    content: {
      type: String,
      required: [true, 'Content is required.']
    },
    status: {
      type: String,
      required: [true, 'Status is required.'],
      enum: ["0", "1", "2"]
    },
  },
  {
    timestamps: true
  }
);


export const PostsProviders = [
  {
    provide: Schema.POST_MODEL,
    useFactory: (connection: Connection) => connection.model('Posts', PostSchema),
    inject: [Schema.DATABASE_CONNECTION],
  },
];