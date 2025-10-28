import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Nous Library API')
    .setDescription(`
### API do sistema Nous Library  
Inclui endpoints para usuários, livros, empréstimos.  
Roles: **ADMIN**, **USER**.  
Use Bearer token para endpoints protegidos.
    `)
    .setVersion('1.0')
    .addTag('Admin', 'Autenticação e contas de administrador')
    .addTag('User', 'Autenticação e contas de usuário')
    .addTag('Books', 'Gerenciamento de livros')
    .addTag('Loans', 'Gerenciamento de empréstimos')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
