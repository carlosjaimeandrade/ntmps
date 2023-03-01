import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {

    @Get('list')
    findAll(): string {
        return "Listagem de recursos"
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `Curso numero #${id}`
    }

    @Post()
    create(@Body() body) {
        return body
    }
}
