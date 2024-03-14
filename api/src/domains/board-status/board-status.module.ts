import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.entity';
import { BoardStatusService } from './board-status.service';
import { BoardStatusController } from './board-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardStatus])],
  providers: [BoardStatusService],
  controllers: [BoardStatusController],
})
export class BoardStatusModule {}
