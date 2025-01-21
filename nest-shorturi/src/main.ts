import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './pipes/validate.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidateInputPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Short URL API')
    .setDescription('The Short URL API description')
    .setVersion('1.0')
    .build();

  const { ShortUrlModule } = await import('./shorturl/shorturl.module');
  const document = SwaggerModule.createDocument(app, config, {
    include: [ShortUrlModule],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
