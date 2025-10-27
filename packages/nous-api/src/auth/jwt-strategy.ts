import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { z } from "zod";
import { AppConfigService } from "src/config/config.service";

const tokenSchema = z.object({
  sub: z.uuid(),
  role: z.enum(["ADMIN", "USER"])
});

export type UserPayload = z.infer<typeof tokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: AppConfigService
  ) {
    const publicKey = config.getJwtPublicKey();

    if (!publicKey) {
      throw new Error("JWT public key is not configured");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: publicKey,
      algorithms: ["RS256"],
    });
  }

  async validate(payload: UserPayload) {
    return tokenSchema.parse(payload);
  }
}