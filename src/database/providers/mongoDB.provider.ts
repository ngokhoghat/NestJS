import * as mongoose from 'mongoose';
import { constant } from 'src/utils';

export const mongoDbProviders = [
  {
    provide: constant.Schema.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constant.MONGO_DB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];
