import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name', example: 'E-commerce Platform' })
  @IsString()
  @IsNotEmpty({ message: 'Project name is required' })
  @MaxLength(100, { message: 'Project name must be less than 100 characters' })
  name!: string;

  @ApiPropertyOptional({ description: 'Project description' })
  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must be less than 1000 characters' })
  description?: string;

  @ApiProperty({ description: 'Organization ID', example: 'clx123abc' })
  @IsUUID()
  @IsNotEmpty({ message: 'Organization ID is required' })
  orgId!: string;

  @ApiPropertyOptional({ description: 'Department ID' })
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiPropertyOptional({ description: 'Project template', example: 'saas-starter' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  template?: string;
}
