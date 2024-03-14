import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCard } from './board-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardCardsService {
  constructor(
    @InjectRepository(BoardCard)
    private taskRepository: Repository<BoardCard>,
  ) {}
  async getAll(): Promise<BoardCard[]> {
    return await this.taskRepository.find();
  }

  async create(name: string) {
    const task = this.taskRepository.create({ name });
    return await this.taskRepository.save(task);
  }
}
