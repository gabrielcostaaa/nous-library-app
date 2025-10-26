import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: NestConfigService) { }

  getDatabaseUrl(): string {
    return this.config.get<string>('DATABASE_URL', '');
  }

  getApiPort(): number {
    return Number(this.config.get<string>('API_PORT') ?? 3000);
  }

  getJwtSecret(): string | undefined {
    return this.config.get<string>('JWT_SECRET');
  }

  getJwtPrivateKey(): string | undefined {
    const base64 = this.config.get<string>('JWT_PRIVATE_KEY');
    if (!base64) return undefined;
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  getJwtPublicKey(): string | undefined {
    const base64 = this.config.get<string>('JWT_PUBLIC_KEY');
    if (!base64) return undefined;
    return Buffer.from(base64, 'base64').toString('utf8');
  }
}
