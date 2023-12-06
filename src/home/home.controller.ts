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
import { HomeService } from './home.service';
import { CreateHomeDto, EditHomeDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from '../config/file-upload.config';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  getHome() {
    return this.homeService.getHome();
  }

  @UseGuards(JwtGuard)
  @Put()
  @UseInterceptors(FileInterceptor('image', fileUploadConfig('./uploads/')))
  editHome(@UploadedFile() image, @Body() dto: EditHomeDto) {
    return this.homeService.editHome(dto, image);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteBookmark() {
    return this.homeService.deleteHome();
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', fileUploadConfig('./uploads/')))
  async createHome(@UploadedFile() image, @Body() dto: CreateHomeDto) {
    return this.homeService.createHome(dto, image);
  }

  @Get(':imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(imagename, { root: 'uploads' });
  }
}
