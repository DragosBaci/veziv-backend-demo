import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
