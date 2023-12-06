import { IsOptional, IsString } from 'class-validator';

export class EditAboutDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  descriptionTitle: string;
}
