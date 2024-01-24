import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardCardsModule } from './domains/tasks/board-cards.module';
import { BoardStatusModule } from './domains/status/board-status.module';
import { UserModule } from './domains/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    BoardCardsModule,
    BoardStatusModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
