import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PackageService } from './package.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllPackagesDto, UpdatePackageDto } from './dto';
import { AdminGuard, JwtGuard } from '../../auth/guards';

@Controller('workshop/packages')
@UseGuards(JwtGuard, AdminGuard)
@ApiBearerAuth()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  @ApiTags('package')
  async findAll(@Query() dto: FindAllPackagesDto) {
    return this.packageService.findAll(dto);
  }

  @Get(':packageUuid')
  @ApiTags('package')
  async findOne(@Param('packageUuid') uuid: string) {
    return this.packageService.findOne(uuid);
  }

  @Post('update')
  @ApiTags('package')
  async update(@Body() updateDto: UpdatePackageDto) {
    return this.packageService.update(updateDto);
  }

  @Post(':packageUuid/unpublish')
  @ApiTags('package')
  async favorite(@Param('packageUuid') uuid: string) {
    return await this.packageService.unpublish(uuid);
  }
}
