import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardStatusService } from './board-status.service';

@Controller('status')
export class BoardStatusController {
  constructor(private readonly statusService: BoardStatusService) {}
  @Get()
  getAllStatus() {
    return this.statusService.getAll();
  }

  @Post()
  createStatus(@Body('name') name: string) {
    return this.statusService.create(name);
  }
}
