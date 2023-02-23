import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule, { cors: true });
  //cors
  app.enableCors({
    origin: [process.env.FRONT_URL_SITE],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  });

  //listen
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
