import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmark() {
    return this.prisma.bookmark.findFirst();
  }

  async createBookmark(dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({ data: { ...dto } });
  }

  async saveImage(image: any) {
    const bookmark = await this.prisma.bookmark.findFirst();
    return this.prisma.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: {
        image: image.filename,
      },
    });
  }

  async editBookmark(dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findFirst();

    return this.prisma.bookmark.update({
      where: {
        id: bookmark.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmark() {
    const bookmark = await this.prisma.bookmark.findFirst();

    await this.prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });
  }
}
