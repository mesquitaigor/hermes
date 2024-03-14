import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCard } from './board-card.entity';
import { BoardCardsService } from './board-cards.service';
import { BoardCardsController } from './board-cards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardCard])],
  providers: [BoardCardsService],
  controllers: [BoardCardsController],
})
export class BoardCardsModule {}
