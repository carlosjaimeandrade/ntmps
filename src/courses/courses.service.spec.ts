import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// const createMockRepository = <T = any>(): MockRepository<T> => ({
//   findOne: jest.fn()
// })

interface MockCourseRepository extends Repository<Course> {
  findOne: jest.Mock;
}

describe('CoursesService', () => {
  let service: CoursesService;
  let courseRepository: MockCourseRepository;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Course),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    //courseRepository = module.get<MockCourseRepository>(getRepositoryToken(Course));
    courseRepository = module.get<MockCourseRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne',  () => {
    it('should search data for id', async () => {
      const courseid = '1'
      // const expectCourses = [
      //   {id: 1},
      //   {id: 2}
      // ]
      const expectCourses = {}

      //courseRepository.findOne.mockReturnValue(expectCourses);
      jest.spyOn(courseRepository, 'findOne').mockReturnValue(expectCourses);
      //const course = await service.findOne(courseid)
      
      expect(await service.findOne(courseid)).toEqual(expectCourses)
    });
    it('should return NotFoundException', async () => {
      const courseid = '1'
      // const expectCourses = [
      //   {id: 1},
      //   {id: 2}
      // ]

      //courseRepository.findOne.mockReturnValue(expectCourses);
      jest.spyOn(courseRepository, 'findOne').mockReturnValueOnce(undefined);

      try{
        await service.findOne(courseid)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Course ${courseid} not found`);
      }

    });
  });
  
});
