import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCardsModule } from './domains/tasks/board-cards.module';
import { BoardStatusModule } from './domains/status/board-status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'igor.mesquita',
      password: 'tsCz6fmhAJErn3R',
      database: 'hermesDb',
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.js,.ts}`],
      migrationsRun: true,
    }),
    BoardCardsModule,
    BoardStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
