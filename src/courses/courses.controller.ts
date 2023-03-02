import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, Res, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { UpdateCourseDto } from './dto/create-course.dto/update-course.dto';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {
    constructor(private readonly coursesService: CoursesService){}
    
    @Get('list')
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() createdCourseDto: CreateCourseDto) {
        this.coursesService.create(createdCourseDto);
        return createdCourseDto
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }
}
