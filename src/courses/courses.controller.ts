import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, Res, Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {
    constructor(private readonly coursesService: CoursesService){

    }
    
    @Get('list')
    findAll(@Res() response): string {
        return response.status(200).json("Listagem de cursos") // não é a melhor forma de retornar o HTTP CODE
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `Curso numero #${id}`
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT) 
    create(@Body() body) {
        return body
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body): object {
        return {
            message: `Atualizando o campo ${id}`,
            body
        } 
    }
    
    @Delete(':id')
    delete(@Param('id') id: string): object {
        return {
            message: `Deletando o registro ${id}`
        } 
    }
}
