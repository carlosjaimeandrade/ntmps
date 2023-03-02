import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/create-course.dto/update-course.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursesRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
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

    async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map((name: string) => this.preLoadTagByName(name))
        );
        const course = this.coursesRepository.create({
            ...createCourseDto,
            tags
        })
        return this.coursesRepository.save(course)
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const tags = updateCourseDto.tags && 
        (
            await Promise.all(
                updateCourseDto.tags.map((name: string) => this.preLoadTagByName(name))
            )
        );

        const course = await this.coursesRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags
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

    private async preLoadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({where: { name }});

        if(tag) {
            return tag;
        }

        return this.tagRepository.create({ name })
    }
}
