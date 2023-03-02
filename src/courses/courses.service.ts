import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Course } from "./entities/course.entity"

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'fudamento do framework nest',
            description: "Descrição",
            tags: ['node.js', 'js', 'nest']
        }
    ];

    findAll(): Course[] {
        return this.courses
    }

    findOne(id: string): Course {
        const course: Course = this.courses.find((course: Course) => course.id === Number(id));
        if(!course){
            throw new HttpException(`Course ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return course
    }

    create(createCourseDto: any) {
        return this.courses.push(createCourseDto);
    }

    update(id: string, updateCourseDto: any) {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));
        this.courses[indexCourse] = updateCourseDto
    }

    remove(id: string) {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));
        if(indexCourse >= 0){
            this.courses.splice(indexCourse, 1)
        }
    }
}
