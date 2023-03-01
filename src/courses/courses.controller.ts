import { Controller, Get } from '@nestjs/common';

@Controller('courses') //posso definir um prefix ou não
export class CoursesController {

    @Get('list')
    findAll(): string {
        return "Listagem de recursos"
    }
}
