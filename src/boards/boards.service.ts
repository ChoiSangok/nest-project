import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRespository: BoardRepository,
  ) {}

  // 전체조회
  getAllBoards(): Promise<Board[]> {
    return this.boardRespository.find();
  }

  //생성
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRespository.createBoard(createBoardDto, user);
  }

  // //아이디조회
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRespository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`can't find Board with Id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRespository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;

    await this.boardRespository.save(board);

    return board;
  }
}
