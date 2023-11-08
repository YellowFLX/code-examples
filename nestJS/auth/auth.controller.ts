import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  DiscordGuard,
  GoogleGuard,
  JwtGuard,
  TwitchGuard,
  VkGuard,
} from '../core/guards';
import { UnauthorizedFilter } from './filters/unauthorized.filter';
import { AuthService } from './services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly oauth: AuthService,
    private readonly config: ConfigService,
  ) {}

  private readonly clientURL = this.config.get('CLIENT_URL');

  @Get('discord')
  @Redirect()
  @UseGuards(DiscordGuard)
  @UseFilters(UnauthorizedFilter)
  @ApiTags('auth')
  async discord(@Req() req) {
    const { accessToken } = await this.oauth.continue(req.user);
    return {
      url: `${this.clientURL}/auth/callback?accessToken=${accessToken}`,
    };
  }

  @Get('google')
  @Redirect()
  @UseGuards(GoogleGuard)
  @UseFilters(UnauthorizedFilter)
  @ApiTags('auth')
  async google(@Req() req) {
    const { accessToken } = await this.oauth.continue(req.user);
    return {
      url: `${this.clientURL}/auth/callback?accessToken=${accessToken}`,
    };
  }

  @Get('twitch')
  @Redirect()
  @UseGuards(TwitchGuard)
  @UseFilters(UnauthorizedFilter)
  @ApiTags('auth')
  async twitch(@Req() req) {
    const { accessToken } = await this.oauth.continue(req.user);
    return {
      url: `${this.clientURL}/auth/callback?accessToken=${accessToken}`,
    };
  }

  @Get('vk')
  @Redirect()
  @UseGuards(VkGuard)
  @UseFilters(UnauthorizedFilter)
  @ApiTags('auth')
  async vk(@Req() req) {
    const { accessToken } = await this.oauth.continue(req.user);
    return {
      url: `${this.clientURL}/auth/callback?accessToken=${accessToken}`,
    };
  }

  @Get('discord/link')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async discordConnect() {
    return await this.oauth.discordConnectLink();
  }

  @Post('discord/connect')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async discordConnectCallback(@Req() req, @Body() body) {
    const payload = await this.oauth.discordCodeExchange(body.code);

    if (!payload.providerID) {
      throw new HttpException(
        { status: HttpStatus.EXPECTATION_FAILED, error: 'Discord linking failed' },
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    await this.oauth.oauthConnect(payload, req.user.uuid);

    return { message: `${payload.provider} linked` };
  }
}
