import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';

import { Student } from './student.entity';
import { CreateStudentInput, UpdateStudentInput } from './dto';
import { CourseService } from '../course/course.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly courseService: CourseService,
    private readonly connection: DataSource,
  ) {}

  async getMany() {
    return await this.studentRepository.find({});
  }

  async getOne(id: string) {
    return await this.studentRepository.findOne({
      relations: {
        courses: true,
      },
      where: {
        id,
      },
    });
  }

  async create(data: CreateStudentInput) {
    const student = this.studentRepository.create({
      ...data,
    });
    return await this.studentRepository.save(student);
  }

  async delete(id: string) {
    const student = await this.getOne(id);
    await this.studentRepository.delete({ id });
    return student;
  }

  async update(data: UpdateStudentInput) {
    const course = await this.studentRepository.save({ ...data });
    return course;
  }

  async addStudentToCourse(studentId: string, courseId: string) {
    const student = await this.getOne(studentId);
    const course = await this.courseService.getOne(courseId);

    student.courses = student.courses || [];
    student.courses.push(course);

    await this.connection.transaction(async (manager) => {
      await manager.save(student);
    });

    return student;
  }

  async deleteStudentFromCourse(studentId: string, courseId: string) {
    const student = await this.getOne(studentId);

    student.courses = student.courses || [];
    student.courses = student.courses.filter((s) => s.id != courseId);

    await this.connection.transaction(async (manager) => {
      await manager.save(student);
    });

    return student;
  }
}
