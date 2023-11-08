import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Params, Profile, Strategy, VerifyCallback } from 'passport-vkontakte';
import { ConfigService } from '@nestjs/config';
import { PassportInterface } from '../interfaces/passport.interface';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
  constructor(private readonly config: ConfigService) {
    super(
      {
        scope: ['email'],
        clientID: config.get('VK_CLIENT_ID'),
        clientSecret: config.get('VK_CLIENT_SECRET'),
        callbackURL: config.get('API_URL') + '/auth/vk',
      },

      /**
       * This method will validate the user.
       * @param accessToken
       * @param refreshToken
       * @param params
       * @param profile
       * @param done
       */
      async (
        accessToken: string,
        refreshToken: string,
        params: Params,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        if (!profile.emails || !profile.emails.length) {
          done(new Error());
          return;
        }

        const email = profile.emails[0].value;
        const avatar = profile.photos ? profile.photos[0]?.value : null;

        const payload: PassportInterface = {
          provider: 'vk',
          providerID: profile.id.toString(),
          username: profile.username || profile.displayName,
          email,
          avatar,
          accessToken,
          discriminator: null,
          bannerColor: null,
        };

        return done(null, payload);
      },
    );
  }
}
