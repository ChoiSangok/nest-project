import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'choi6882@',
  database: 'Board-app', // database 이름
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 사용할 entity의 클래스명
  synchronize: false,
};
