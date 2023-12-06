import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  descriptionTitle: string;

  @IsString()
  @IsNotEmpty()
  descriptionSubtitle: string;
}
