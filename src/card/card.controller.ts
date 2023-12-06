import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import { JwtGuard } from '../auth/guard';
import { CreateCardDto, EditCardDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from '../config/file-upload.config';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  getCard() {
    return this.cardService.getCards();
  }

  @Get(':id')
  getCardById(@Param('id', ParseIntPipe) cardId: number) {
    return this.cardService.getCardById(cardId);
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', fileUploadConfig('./uploads/')))
  async createCard(@UploadedFile() image, @Body() dto: CreateCardDto) {
    return this.cardService.createCard(dto, image);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', fileUploadConfig('./uploads/')))
  editCard(@UploadedFile() image, @Param('id', ParseIntPipe) cardId: number, @Body() dto: EditCardDto) {
    return this.cardService.editCardById(cardId, dto, image);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(@Param('id', ParseIntPipe) cardId: number) {
    return this.cardService.deleteCardById(cardId);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(imagename, { root: 'uploads' });
  }
}
