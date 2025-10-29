import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { RegisterLoansController } from "./controllers/register-loans.controller";
import { AdminCreateAccountController } from "./controllers/admin-create-account.controller";
import { UserCreateAccountController } from "./controllers/user-create-account.controller";
import { RegisterBooksController } from "./controllers/register-books.controller";
import { ListBooksController } from "./controllers/list-books.controller";
import { ListLoansController } from "./controllers/lisit-loans.controller";
import { FilesLocalModule } from "./files/files-local.module";
import { DeleteBookController } from "./controllers/delete-books.controller";

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    FilesLocalModule,
    AuthModule
  ],
  controllers: [
    AdminCreateAccountController,
    UserCreateAccountController,
    RegisterLoansController,
    RegisterBooksController,
    ListBooksController,
    ListLoansController,
    DeleteBookController
  ],
})
export class AppModule { }
