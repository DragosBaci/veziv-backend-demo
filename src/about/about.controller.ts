import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from '../config/file-upload.config';
import { AboutService } from './about.service';
import { CreateAboutDto, EditAboutDto } from './dto';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.getAbout();
  }

  @UseGuards(JwtGuard)
  @Put()
  @UseInterceptors(FileInterceptor('model', fileUploadConfig('./uploads/')))
  editAbout(@UploadedFile() model, @Body() dto: EditAboutDto) {
    return this.aboutService.editAbout(dto, model);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteAbout() {
    return this.aboutService.deleteAbout();
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('model', fileUploadConfig('./uploads/')))
  async createAbout(@UploadedFile() model, @Body() dto: CreateAboutDto) {
    return this.aboutService.createAbout(dto, model);
  }

  @Get(':modelname')
  findProfileImage(@Param('modelname') modelname, @Res() res) {
    return res.sendFile(modelname, { root: 'uploads' });
  }
}
