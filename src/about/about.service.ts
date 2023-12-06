import { Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAboutDto, EditAboutDto } from './dto';

@Injectable()
export class AboutService {
  constructor(private prisma: PrismaService) {}

  getAbout() {
    return this.prisma.about.findFirst();
  }

  async createAbout(dto: CreateAboutDto, model: any) {
    return this.prisma.about.create({
      data: {
        ...dto,
        model: model.filename,
      },
    });
  }

  async editAbout(dto: EditAboutDto, @UploadedFile() image?: any) {
    const about = await this.prisma.about.findFirst();

    if (about) {
      const existingModel = about.model;

      return this.prisma.about.update({
        where: {
          id: about.id,
        },
        data: {
          ...dto,
          model: image ? image.filename : existingModel,
        },
      });
    } else {
      throw new Error('Model record not found');
    }
  }

  async deleteAbout() {
    const about = await this.prisma.about.findFirst();

    await this.prisma.about.delete({
      where: {
        id: about.id,
      },
    });
  }
}
