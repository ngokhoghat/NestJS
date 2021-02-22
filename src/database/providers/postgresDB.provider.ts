import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '../testPostgresDB/account.entity';

export const postgreSqlProviders = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ngocdinh',
    database: 'qlbh',
    entities: [Account],
    synchronize: true,
  })
];