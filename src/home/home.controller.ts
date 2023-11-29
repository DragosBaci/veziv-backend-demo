import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { HomeService } from './home.service';
import { CreateHomeDto, EditHomeDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  getHome() {
    return this.homeService.getHome();
  }

  @UseGuards(JwtGuard)
  @Put()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  editHome(@UploadedFile() image, @Body() dto: EditHomeDto) {
    return this.homeService.editHome(dto, image);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteBookmarkById() {
    return this.homeService.deleteHome();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadSingleFile(@UploadedFile() image, @Body() dto: CreateHomeDto) {
    return this.homeService.createHome(dto, image);
  }
}
