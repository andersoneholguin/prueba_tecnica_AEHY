import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';


export const initSwagger = (app: INestApplication) => {    
    const swaggerConfig = new DocumentBuilder()
        .setTitle('USERS - API REST')
        .setDescription('CRUD de usuarios para prueba tecnica')
        .build();
    const document = SwaggerModule.createDocument(app,swaggerConfig);
    SwaggerModule.setup('/documentation', app, document)
}