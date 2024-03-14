import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../domains/user/user.entity';
import { BoardStatus } from '../domains/board-status/board-status.entity';
import { BoardCard } from '../domains/board-card/board-card.entity';
import { Workspace } from '../domains/workspace/workspace.entity';
import { UserWorkspaceRelationship } from '../domains/user-worspace-relationship/user-worspace-relationship.entity';
import { SpaceBoard } from '../domains/space-board/space-board.entity';
import { Space } from '../domains/space/space.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          migrations: [`./migrations/**/*{.js,.ts}`],
          entities: [
            User,
            BoardStatus,
            BoardCard,
            SpaceBoard,
            Space,
            Workspace,
            UserWorkspaceRelationship,
          ],
          logging: true,
          migrationsRun: true,
          timezone: 'Z',
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
