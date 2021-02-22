import { TypeOrmModule } from '@nestjs/typeorm';

export const MySqlProviders = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ngocdinh',
    database: 'postgres',
    entities: [],
    synchronize: true,
  })
];