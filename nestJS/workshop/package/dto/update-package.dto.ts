import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdatePackageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @ApiProperty()
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
}
