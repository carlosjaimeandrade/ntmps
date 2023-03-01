import { Body, Controller, Get, HttpCode, Param, Post, HttpStatus, Res } from '@nestjs/common';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {

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
}
