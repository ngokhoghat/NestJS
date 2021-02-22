import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Schema } from 'src/utils/constant';

export const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
    },
    name: {
      type: String,
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


export const AccountProviders = [
  {
    provide: Schema.ACCOUNT_MODEL,
    useFactory: (connection: Connection) => connection.model('Accounts`', AccountSchema),
    inject: [Schema.DATABASE_CONNECTION],
  },
];