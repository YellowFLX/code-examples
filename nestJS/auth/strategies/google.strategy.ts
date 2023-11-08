import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PassportInterface } from '../interfaces/passport.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    super(
      {
        scope: ['email', 'profile'],
        clientID: config.get('GOOGLE_CLIENT_ID'),
        clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
        callbackURL: config.get('API_URL') + '/auth/google',
      },

      /**
       * This method will validate the user.
       * @param accessToken
       * @param refreshToken
       * @param profile
       * @param done
       */
      async (
        accessToken: string,
        refreshToken: string,
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
          provider: 'google',
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
