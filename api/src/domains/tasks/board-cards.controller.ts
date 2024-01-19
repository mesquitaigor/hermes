import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardCardsService } from './board-cards.service';

@Controller('tasks')
export class BoardCardsController {
  constructor(private readonly tasksService: BoardCardsService) {}
  @Get()
  getAllTasks() {
    return this.tasksService.getAll();
  }

  @Post()
  createTasks(@Body('name') name: string) {
    return this.tasksService.create(name);
  }
}
