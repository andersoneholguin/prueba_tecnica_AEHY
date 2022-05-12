import { NestFactory } from '@nestjs/core';
import * as AWS from 'aws-sdk';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  initSwagger(app);
  AWS.config.update({
    region:'us-east-1',
    accessKeyId: 'AKIASAXSAGLUSKODY45J',
    secretAccessKey: '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'
  });
  await app.listen(3000);
}
bootstrap();
