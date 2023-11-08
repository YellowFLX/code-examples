import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@libs/prisma';
import { CreateTagDto } from './create-tag.dto';
import { AdminGuard, JwtGuard } from '../../auth/guards';

const SwaggerTags = ApiTags('workshop', 'tag');

@Controller('workshop/tags')
@UseGuards(JwtGuard, AdminGuard)
@ApiBearerAuth()
export class TagController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiTags('tag')
  @SwaggerTags
  async findAll() {
    return this.prisma.workshopTag.findMany({ orderBy: { name: 'asc' } });
  }

  @Post()
  @ApiTags('tag')
  async create(@Body() createTagDto: CreateTagDto) {
    return this.prisma.workshopTag.create({
      data: { name: createTagDto.name },
    });
  }

  @Post(':tagUuid')
  @ApiTags('tag')
  async update(@Param('tagUuid') uuid: string, @Body() body: CreateTagDto) {
    return this.prisma.workshopTag.update({
      where: { uuid },
      data: { name: body.name },
    });
  }

  @Delete(':tagUuid')
  @ApiTags('tag')
  async remove(@Param('tagUuid') uuid: string) {
    return this.prisma.workshopTag.delete({
      where: { uuid },
    });
  }
}
