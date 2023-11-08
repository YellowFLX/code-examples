import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserPictureFileType } from '@prisma/client';
import { FileService } from '@apps/api/file';
import { PrismaService } from '@libs/prisma';
import { PassportInterface } from '../interfaces/passport.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly file: FileService,
    private readonly config: ConfigService,
  ) {}

  /**
   * This method will return the jwt token for the user.
   * @param user
   * @private
   */
  private responseToken(user: User) {
    return {
      accessToken: this.jwt.sign({
        sub: user.uuid,
        email: user.email,
        username: user.username,
      }),
    };
  }

  /**
   * This method will return unique discriminator.
   * @param payload
   */
  private async getUniqueDiscriminator(payload: PassportInterface): Promise<string> {
    const discriminator =
      payload.discriminator ||
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');

    const user = await this.prisma.user.count({
      where: { username: payload.username, discriminator },
    });

    if (user) {
      return this.getUniqueDiscriminator(payload);
    }

    return discriminator;
  }

  /**
   * This method will upsert the oauth.
   * @param payload
   * @param userUuid
   */
  async oauthConnect(payload: PassportInterface, userUuid: string) {
    await this.prisma.oAuth.upsert({
      where: { providerID: payload.providerID },
      create: {
        provider: payload.provider,
        providerID: payload.providerID,
        accessToken: payload.accessToken,
        user: { connect: { uuid: userUuid } },
      },
      update: {
        accessToken: payload.accessToken,
        user: { connect: { uuid: userUuid } },
      },
    });
  }

  /**
   * This method will create a new user in the database.
   * @param payload
   * @private
   */
  private async signup(payload: PassportInterface) {
    const discriminator = await this.getUniqueDiscriminator(payload);
    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        username: payload.username,
        discriminator: discriminator,
        profile: {
          create: {
            color: payload.bannerColor,
          },
        },
      },
    });

    await this.oauthConnect(payload, user.uuid);

    if (payload.avatar) {
      const file = await this.prisma.file.create({
        data: {
          src: await this.file.download(payload.avatar),
          userUuid: user.uuid,
        },
      });

      await this.prisma.userPictureFile.create({
        data: {
          type: UserPictureFileType.AVATAR,
          userUuid: user.uuid,
          fileUuid: file.uuid,
        },
      });
    }

    return user;
  }

  /**
   * This method will handle the login.
   * @param payload
   * @param user
   */
  private async login(payload: PassportInterface, user: User) {
    await this.oauthConnect(payload, user.uuid);
    return user;
  }

  /**
   * This method will handle the oAuth login.
   * @param payload
   */
  async continue(payload: PassportInterface) {
    const oauth = await this.prisma.oAuth.findUnique({
      where: { providerID: payload.providerID },
    });

    const user = oauth
      ? await this.prisma.user.findUnique({ where: { uuid: oauth.userUuid } })
      : await this.prisma.user.findUnique({ where: { email: payload.email } });

    return this.responseToken(
      user ? await this.login(payload, user) : await this.signup(payload),
    );
  }

  async discordConnectLink() {
    const clientID = this.config.get('DISCORD_CLIENT_ID');
    const callbackURL = `${this.config.get('CLIENT_URL')}/discord/connect`;
    return {
      url: `https://discord.com/oauth2/authorize?response_type=code&client_id=${clientID}&scope=email%20identify&redirect_uri=${callbackURL}&prompt=none`,
    };
  }

  async discordCodeExchange(code: string) {
    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: this.config.get('DISCORD_CLIENT_ID') as string,
        client_secret: this.config.get('DISCORD_CLIENT_SECRET') as string,
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${this.config.get('CLIENT_URL')}/discord/connect`,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = await response.json();

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userJson = await userResponse.json();

    const payload: PassportInterface = {
      provider: 'discord',
      providerID: userJson.id,
      username: userJson.username,
      discriminator: userJson.discriminator,
      email: userJson.email,
      avatar: `https://cdn.discordapp.com/avatars/${userJson.id}/${userJson.avatar}.png`,
      bannerColor: userJson.banner_color,
      accessToken: access_token,
    };

    return payload;
  }
}
