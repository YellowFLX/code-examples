import { Module } from '@nestjs/common';
import { PrismaModule } from '@libs/prisma';
import { TagController } from './tag.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TagController],
})
export class WorkshopTagModule {}
