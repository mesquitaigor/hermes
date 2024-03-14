import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { Space } from './space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  providers: [SpaceService],
  controllers: [SpaceController],
  exports: [SpaceService],
})
export class SpaceModule {}
