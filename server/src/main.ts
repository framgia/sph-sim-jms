import * as dotenv from "dotenv";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("JMS")
    .setVersion("1.0")
    .setDescription("The jms api")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Enable pipeline validation globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
