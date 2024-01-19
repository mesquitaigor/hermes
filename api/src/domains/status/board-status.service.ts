import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './model/BoardStatus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardStatusService {
  constructor(
    @InjectRepository(BoardStatus)
    private statusRepository: Repository<BoardStatus>,
  ) {}
  async getAll(): Promise<BoardStatus[]> {
    return await this.statusRepository.find();
  }

  async create(name: string) {
    const status = this.statusRepository.create({ name });
    return await this.statusRepository.save(status);
  }
}
