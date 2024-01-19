import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCards } from './model/BoardCards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardCardsService {
  constructor(
    @InjectRepository(BoardCards)
    private taskRepository: Repository<BoardCards>,
  ) {}
  async getAll(): Promise<BoardCards[]> {
    return await this.taskRepository.find();
  }

  async create(name: string) {
    const task = this.taskRepository.create({ name });
    return await this.taskRepository.save(task);
  }
}
