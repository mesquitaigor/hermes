import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCards } from './model/BoardCards.entity';
import { BoardCardsService } from './board-cards.service';
import { BoardCardsController } from './board-cards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardCards])],
  providers: [BoardCardsService],
  controllers: [BoardCardsController],
})
export class BoardCardsModule {}
