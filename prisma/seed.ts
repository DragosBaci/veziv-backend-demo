import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

export class CardSeeder {
  static async run(prisma: PrismaClient): Promise<void> {
    try {
      const user = {
        email: 'veziv@gmail.com',
        password: 'password',
      };
      const hash = await argon.hash(user.password);

      const createUser = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
          email: user.email,
          hash: hash,
        },
      });

      const home = await prisma.home.upsert({
        where: { id: 1 },
        update: {},
        create: {
          title: 'Software Developer',
          subtitle: 'Creative',
          description: 'I AM A FULL-STACK DEVELOPER BASED IN ROMANIA WHO LOVES CODING AND ALWAYS IMPROVING MY SKILLS.',
          image: 'background.jpg',
          email: 'dragos617@yahoo.com',
        },
      });

      const about = await prisma.about.upsert({
        where: { id: 1 },
        update: {},
        create: {
          description:
            'I USE MY PASSION AND SKILLS TO CREATE INNOVATIVE AND DYNAMIC DIGITAL SOLUTIONS. WHILE ALSO LEARNING AUTOMATION ENGINEERING , I BRING A UNIQUE PERSPECTIVE AND SKILL SET TO EVERY PROJECT I WORK ON. IN MY FREE TIME, I LIKE TO WORK OUT, READ ABOUT PHILOSOPHY AND PLAY CHESS.',
          model: 'snake_statue.glb',
          descriptionTitle: 'Hello I am Dragos',
          descriptionSubtitle: 'Baci Dragos',
        },
      });

      const card1 = await prisma.card.upsert({
        where: { id: 1 },
        update: {},
        create: {
          title: 'Car Flow App',
          subtitle: 'UX/UI Design,Development',
          description:
            'Our team, consisting of five individuals, developed an application as part of a school project. The app is designed for efficiently managing a fleet of cars, whether for company or personal use.',
          image: 'CarFlow.jpg',
          link: 'https://github.com/orgs/Urzisoft/repositories',
          isHidden: false,
        },
      });

      const card2 = await prisma.card.upsert({
        where: { id: 2 },
        update: {},
        create: {
          title: 'Device Manager',
          subtitle: 'UX/UI Design,Development',
          description:
            'During my internship at 3SS in Targu Mures, I contributed to the development of an app aimed at efficiently managing the devices within the company.',
          image: '3ss.jpg',
          link: 'https://www.3ss.tv/',
          isHidden: false,
        },
      });

      const card3 = await prisma.card.upsert({
        where: { id: 3 },
        update: {},
        create: {
          title: 'Microservices',
          subtitle: 'Development',
          description:
            'The development of this app was undertaken with the specific goal of gaining deeper insights into the microservice architecture using Spring Boot.',
          image: 'microservice.jpg',
          link: 'https://github.com/DragosBaci/java-microservices-demo',
          isHidden: false,
        },
      });

      const card4 = await prisma.card.upsert({
        where: { id: 4 },
        update: {},
        create: {
          title: 'CarRepair',
          subtitle: 'UX/UI Design,Development',
          description:
            'My colleague and I collaborated on the development of an application that employs Artificial Intelligence to assess the extent of damage to a car following an accident.',
          image: 'carRepair.jpg',
          link: 'https://github.com/Urzisoft/urzisoft-car-damage-management-mobile-app',
          isHidden: false,
        },
      });
    } catch (error) {
      console.error('Error seeding:', error);
      throw error;
    }
  }
}
