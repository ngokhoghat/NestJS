import * as mongoose from 'mongoose';
import { constant } from 'src/utils';

export const databaseProviders = [
  {
    provide: constant.Schema.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(constant.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
  },
];