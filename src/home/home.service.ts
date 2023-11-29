import { Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHomeDto, EditHomeDto } from './dto';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  getHome() {
    return this.prisma.home.findFirst();
  }

  async createHome(dto: CreateHomeDto, image: any) {
    return this.prisma.home.create({
      data: {
        ...dto,
        image: image.filename,
      },
    });
  }

  async editHome(dto: EditHomeDto, @UploadedFile() image?: any) {
    const home = await this.prisma.home.findFirst();

    if (home) {
      const existingImage = home.image;

      return this.prisma.home.update({
        where: {
          id: home.id,
        },
        data: {
          ...dto,
          image: image ? image.filename : existingImage,
        },
      });
    } else {
      throw new Error('Home record not found');
    }
  }

  async deleteHome() {
    const home = await this.prisma.home.findFirst();

    await this.prisma.home.delete({
      where: {
        id: home.id,
      },
    });
  }
}
