import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserRepository } from './auth/user.repository';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
  controllers: [BoardsController, AuthController],
  providers: [BoardRepository, BoardsService, UserRepository, AuthService],
})
export class AppModule {}
