import { Module } from '@nestjs/common';
import { PrismaModule } from '@libs/prisma';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { UsersService } from '../../users';

@Module({
  imports: [PrismaModule],
  controllers: [PackageController],
  providers: [PackageService, UsersService],
})
export class PackageModule {}
