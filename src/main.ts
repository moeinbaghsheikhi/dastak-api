import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport'
import * as session from 'express-session'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(session({
    secret: 'secret',
    // singOptions: { expiresIn: '30d' }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const config = new DocumentBuilder()
    .setTitle('My Product Site')
    .setDescription('this is products api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000);
}
bootstrap();
