import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardCardsModule } from './domains/board-card/board-cards.module';
import { BoardStatusModule } from './domains/board-status/board-status.module';
import { UserModule } from './domains/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './domains/workspace/workspace.module';
import { UserWorkspaceRelationshipModule } from './domains/user-worspace-relationship/user-worspace-relationship.module';
import { SpaceModule } from './domains/space/space.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    BoardCardsModule,
    BoardStatusModule,
    UserModule,
    AuthModule,
    WorkspaceModule,
    SpaceModule,
    UserWorkspaceRelationshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
