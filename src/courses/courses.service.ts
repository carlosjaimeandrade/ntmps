import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/create-course.dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursesRepository: Repository<Course>
    ){}

    findAll() {
        return this.coursesRepository.find()
    }

    findOne(id: string) {
        const course = this.coursesRepository.findOne({where: {id: Number(id)}});
        if(!course){
            throw new NotFoundException(`Course ${id} not found`)
        }

        return course
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.coursesRepository.create(createCourseDto)
        return this.coursesRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.coursesRepository.preload({
            id: +id,
            ...updateCourseDto
        })

        if(!course){
            throw new NotFoundException(`Course ${id} not found`)
        }

        return this.coursesRepository.save(course)
    }

    async remove(id: string) {
        const course = await this.coursesRepository.findOneBy({id: Number(id)});

        if(!course){
            throw new NotFoundException(`Course ${id} not found`)
        }

        return this.coursesRepository.remove(course)
    }
}
