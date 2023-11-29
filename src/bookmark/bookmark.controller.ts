import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmark() {
    return this.bookmarkService.getBookmark();
  }

  @Post()
  async createBookmark(@Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(dto);
  }

  @Patch()
  editBookmarkById(@Body() dto: EditBookmarkDto) {
    return this.bookmarkService.editBookmark(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteBookmarkById() {
    return this.bookmarkService.deleteBookmark();
  }

  @Post('upload')
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
  async uploadSingleFile(@UploadedFile() image) {
    return this.bookmarkService.saveImage(image);
  }

  @Get('uploads/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    console.log(imagename);
    return res.sendFile(imagename, { root: 'uploads' });
  }
}
