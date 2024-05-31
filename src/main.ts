import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { linkToDatabase } from './utils/db.util';

const env = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (env.MODE == "DEV") {
		try {
			setupSwagger(app);
			console.log("Swagger is enabled");
		} catch (e) {
			console.error(e);
		}
	}
  linkToDatabase();
  await app.listen(3000);
}
bootstrap();
