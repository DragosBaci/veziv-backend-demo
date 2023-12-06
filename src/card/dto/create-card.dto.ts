import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ obj, key }) => {
    return obj[key] === 'true' ? true : obj[key] === 'false' ? false : obj[key];
  })
  @IsBoolean()
  isHidden: boolean;

  @IsString()
  @IsNotEmpty()
  link: string;
}
