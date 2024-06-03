import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  // 전체조회
  getAllBoards(): Board[] {
    return this.boards;
  }

  //생성
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  //아이디조회
  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`can't find Board with Id ${id}`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);

    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
