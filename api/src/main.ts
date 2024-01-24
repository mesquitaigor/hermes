import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  const HTTP_HOST: string = configService.get<string>('HTTP_HOST');
  const HTTP_PORT: number = configService.get<number>('HTTP_PORT');
  await app.listen(HTTP_PORT, HTTP_HOST);
}
bootstrap();
