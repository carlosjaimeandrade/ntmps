import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoursesModule, 
  //   TypeOrmModule.forRoot({
  //   type: 'postgres',
  //   host: 'localhost',
  //   port: 5432,
  //   username: 'postgres',
  //   password: 'root',
  //   database: 'postgres',
  //   autoLoadEntities: true,
  //   synchronize: true
  // }), 
  DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
