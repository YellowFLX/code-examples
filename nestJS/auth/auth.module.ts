import { FileModule } from '@apps/api/file';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@libs/prisma';
import { DiscordModule } from '@libs/discord';
import { UserModule } from '../user';
import {
  DiscordStrategy,
  GoogleStrategy,
  JwtStrategy,
  TwitchStrategy,
  VkStrategy,
} from './strategies';
import { AuthService, JwtService } from './services';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    PrismaModule,
    ConfigModule,
    DiscordModule,
    UserModule,
    FileModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    DiscordStrategy,
    GoogleStrategy,
    JwtStrategy,
    VkStrategy,
    TwitchStrategy,
  ],
  exports: [JwtService],
})
export class AuthModule {}
