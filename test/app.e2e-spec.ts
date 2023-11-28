import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(8080);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:8080');
  });

  afterAll(() => app.close());

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'email@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw error if email is empty', () => {
        return pactum.spec().post('/auth/signup').withBody(dto.password).expectStatus(400);
      });

      it('should throw error if password is empty', () => {
        return pactum.spec().post('/auth/signup').withBody(dto.email).expectStatus(400);
      });

      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(200);
      });
    });

    describe('Signin', () => {
      it('should throw error if email is empty', () => {
        return pactum.spec().post('/auth/signin').withBody(dto.password).expectStatus(400);
      });

      it('should throw error if password is empty', () => {
        return pactum.spec().post('/auth/signin').withBody(dto.email).expectStatus(400);
      });

      it('should throw error if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get User', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200);
      });
    });

    describe('Edit User', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {});

    describe('Get Bookmark', () => {});

    describe('Get Bookmarks', () => {});

    describe('Get Bookmark By Id', () => {});

    describe('Delete Bookmark', () => {});
  });
});
