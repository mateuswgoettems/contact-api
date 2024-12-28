import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins =
    process.env.ENV === 'production'
      ? [`https://${process.env.APP_DOMAIN}`, `${process.env.APP_DOMAIN}`]
      : [
          `https://${process.env.ENV}.${process.env.APP_DOMAIN}`,
          `${process.env.ENV}.${process.env.APP_DOMAIN}`,
        ];
  app.enableCors({
    origin: origins,
  });
  await app.listen(3000);
}
bootstrap();
