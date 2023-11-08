import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-twitch-strategy';
import { PassportInterface } from '../interfaces/passport.interface';

interface TwitchProfile {
  id: string;
  login: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
  provider: 'twitch';
  displayName: string;
}

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  constructor(private readonly config: ConfigService) {
    super({
      scope: ['user_read'],
      clientID: config.get('TWITCH_CLIENT_ID'),
      clientSecret: config.get('TWITCH_CLIENT_SECRET'),
      callbackURL: config.get('API_URL') + '/auth/twitch',
    });
  }

  /**
   * This method will validate the user.
   * @param accessToken
   * @param refreshToken
   * @param profile
   */
  async validate(accessToken: string, refreshToken: string, profile: TwitchProfile) {
    if (!profile.email) {
      return;
    }

    const payload: PassportInterface = {
      provider: 'twitch',
      providerID: profile.id,
      username: profile.displayName || profile.login,
      email: profile.email,
      avatar: profile.profile_image_url || null,
      accessToken,
      bannerColor: null,
      discriminator: null,
    };

    return payload;
  }
}
