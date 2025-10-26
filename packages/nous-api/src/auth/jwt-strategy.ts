import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Env } from "src/config/env.schema";
import { z } from "zod";

const tokenSchema = z.object({
  sub: z.uuid(),
});

type TokenPayload = z.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: Buffer.from(publicKey!, "utf-8"),
      algorithms: ["RS256"],
    });
  }

  async validate(payload: TokenPayload) {
    return tokenSchema.parse(payload);
  }
}