import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { EditCardDto } from './dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async getCards() {
    return this.prisma.card.findMany({});
  }

  async getCardById(cardId: number) {
    return this.prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });
  }

  async createCard(dto: CreateCardDto, image: any) {
    return this.prisma.card.create({
      data: {
        ...dto,
        image: image.filename,
      },
    });
  }

  async editCardById(cardId: number, dto: EditCardDto, image: any) {
    const card = await this.prisma.card.findUnique({ where: { id: cardId } });

    if (card) {
      const existingImage = card.image;

      return this.prisma.card.update({
        where: {
          id: cardId,
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

  async deleteCardById(cardId: number) {
    await this.prisma.card.delete({
      where: {
        id: cardId,
      },
    });
  }
}
