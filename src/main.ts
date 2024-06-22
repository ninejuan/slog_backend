import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { linkToDatabase } from './utils/db.util';

const env = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	origin: [env.FE_DOMAIN],
	credentials: true,
	exposedHeaders: ['pggtkn', "Authorization"]
  });
  linkToDatabase();
  if (env.MODE == "DEV") {
		try {
			setupSwagger(app);
			console.log("Swagger is enabled");
		} catch (e) {
			console.error(e);
		}
	}
  await app.listen(env.PORT);
}
bootstrap();
