import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto/create-course.dto';

describe('Courses /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
    name: 'Nestjs com TypeORM',
    description: 'Criando apis restful com nestj',
    tags: ['nestjs', 'javascript']

  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'test',
        autoLoadEntities: true,
        synchronize: true
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, //verifica se existe um dado fora do esperado e egnora ele
      forbidNonWhitelisted: true, // não permite enviar dados que não foram mapeado
      transform: true //defini o tipo de valor que chega como valor do body 
    }))


    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it('Create POST/courses', () => {
    return request(app.getHttpServer())
    .post('/courses')
    .send(course)
    .expect(HttpStatus.CREATED)
  })
});
