import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { RegisterLoansController } from "./controllers/register-loans.controller";

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule
  ],
  controllers: [CreateAccountController, RegisterLoansController],
})
export class AppModule { }
