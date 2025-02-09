import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('API Auth')
  .setDescription('Documentation de l’API Auth')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'client/build'));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client/build', 'index.html'));
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
