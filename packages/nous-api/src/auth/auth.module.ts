import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticateController } from '../controllers/authenticate.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (cfg: AppConfigService) => {
        const privateKey = cfg.getJwtPrivateKey();
        const publicKey = cfg.getJwtPublicKey();
        const secret = cfg.getJwtSecret();

        const options: any = {
          signOptions: { algorithm: 'RS256' },
        };

        if (privateKey && publicKey) {
          options.privateKey = privateKey;
          options.publicKey = publicKey;
        } else if (secret) {
          options.secret = secret;
        } else {
          throw new Error('No JWT configuration found (private/public key or secret).');
        }

        return options;
      },
    }),
  ],
  controllers: [AuthenticateController],
  providers: [JwtStrategy],
})
export class AuthModule { }
