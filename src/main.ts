import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.ENV == 'production'
        ? `${process.env.APP_DOMAIN}`
        : `${process.env.ENV}.${process.env.APP_DOMAIN}`,
  });
  console.log(process.env.APP_DOMAIN);
  await app.listen(3000);
}
bootstrap();
