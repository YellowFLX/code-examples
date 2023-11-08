import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from '@oauth-everything/passport-discord';
import { PassportInterface } from '../interfaces/passport.interface';

interface DiscordProfile extends Profile {
  _json: Profile['_json'] & {
    banner_color: string;
  };
}

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly config: ConfigService) {
    super({
      scope: ['email', 'identify'],
      clientID: config.get('DISCORD_CLIENT_ID'),
      clientSecret: config.get('DISCORD_CLIENT_SECRET'),
      callbackURL: config.get('API_URL') + '/auth/discord',
    });
  }

  /**
   * This method will validate the user.
   * @param accessToken
   * @param refreshToken
   * @param profile
   */
  async validate(accessToken: string, refreshToken: string, profile: DiscordProfile) {
    if (!profile.emails || !profile.emails.length) {
      return;
    }

    const email = profile.emails[0].value;
    const avatar = profile.photos ? profile.photos[0]?.value : null;

    const payload: PassportInterface = {
      provider: 'discord',
      providerID: profile.id,
      username: profile.username ? profile.username : email?.split('@')[1],
      bannerColor: profile._json.banner_color || null,
      discriminator: profile._json.discriminator,
      email,
      avatar,
      accessToken,
    };

    return payload;
  }
}
