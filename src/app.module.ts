import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { Board } from './boards/board.entity';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [BoardsController],
  providers: [BoardRepository, BoardsService],
})
export class AppModule {}
