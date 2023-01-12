import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './course.entity';
import { CreateCourseInput, UpdateCourseInput } from './dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getMany() {
    return await this.courseRepository.find({});
  }

  async getOne(id: string) {
    return await this.courseRepository.findOne({
      relations: {
        students: true,
      },
      where: {
        id,
      },
    });
  }

  async create(data: CreateCourseInput) {
    const course = this.courseRepository.create({
      ...data,
    });
    return await this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.getOne(id);
    await this.courseRepository.delete({ id });
    return course;
  }

  async update(data: UpdateCourseInput) {
    const course = await this.courseRepository.save({ ...data });
    return course;
  }
}
