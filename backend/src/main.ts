import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API documentation for the Library Management System')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWE2ZTZiODE4MTYxNzEwOWYzMWI1MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczOTI3NTY4MiwiZXhwIjoxNzQxODY3NjgyfQ.1j-A0JIh5GJjS9RXgteyKLjDgJ09ASXhb8RwCbieH1w") //since the swagger header thing is not working 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(); // Enable CORS
  await app.listen(3000);
}
bootstrap();
