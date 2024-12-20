import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins =
    process.env.ENV === 'production'
      ? [`${process.env.APP_DOMAIN}`]
      : [`${process.env.ENV}.${process.env.APP_DOMAIN}`, 'localhost:5500'];
  app.enableCors({
    origin: origins,
  });
  await app.listen(3000);
  console.log(origins);
}
bootstrap();
