import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("sim-JMS")
    .setDescription("This is the API documentation for sim-jms")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(4000);
}
bootstrap();
