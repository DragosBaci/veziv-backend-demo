import { IsOptional, IsString } from 'class-validator';

export class EditHomeDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  email: string;
}
