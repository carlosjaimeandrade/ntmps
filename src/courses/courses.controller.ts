import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, Res, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {
    constructor(private readonly coursesService: CoursesService){}
    
    @Get('list')
    findAll(): Course[] {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Course {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() body) {
        return this.coursesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.coursesService.update(id, body);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.coursesService.remove(id);
    }
}
