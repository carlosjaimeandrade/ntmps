import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //verifica se existe um dado fora do esperado e egnora ele
    forbidNonWhitelisted: true, // não permite enviar dados que não foram mapeado
    transform: true //defini o tipo de valor que chega como valor do body 
  }))
  await app.listen(3000);
}
bootstrap();
