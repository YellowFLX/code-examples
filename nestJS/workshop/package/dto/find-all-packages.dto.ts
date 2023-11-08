import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

const SortType = {
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  NAME: 'name',
  POPULAR: 'popular',
  USAGES: 'usages',
};

export class PackageFilterDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(3)
  search?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  userUuid?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  verified?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  published?: boolean;

  @ApiProperty()
  @IsOptional()
  @ArrayMinSize(1)
  @IsArray()
  tagsUuid?: string[];
}

export class FindAllPackagesDto {
  @ApiProperty()
  @IsOptional()
  @IsObject()
  filter?: PackageFilterDto;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsOptional()
  @Matches(
    `^${Object.values(SortType)
      .filter((v) => typeof v === 'string')
      .join('|')}$`,
  )
  sort: (typeof SortType)[keyof typeof SortType];
}
