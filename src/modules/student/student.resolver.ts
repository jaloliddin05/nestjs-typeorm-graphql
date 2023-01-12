import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import {
  CreateStudentInput,
  UpdateStudentInput,
  StudentCourseInput,
} from './dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student, { name: 'createStudent' })
  createStudent(
    @Args('CreateStudentInput') CreateStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.create(CreateStudentInput);
  }

  @Query(() => [Student], { name: 'findAllStudents' })
  findAll() {
    return this.studentService.getMany();
  }

  @Query(() => Student, { name: 'findOneStudent' })
  findOne(@Args('id') id: string) {
    return this.studentService.getOne(id);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  updateStudent(
    @Args('UpdateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(updateStudentInput);
  }

  @Mutation(() => Student, { name: 'removeStudent' })
  removeStudent(@Args('id') id: string) {
    return this.studentService.delete(id);
  }

  @Mutation(() => Student, { name: 'addStudentToCourse' })
  addStudentToCourse(@Args('addStudentToCourse') value: StudentCourseInput) {
    return this.studentService.addStudentToCourse(
      value.studentId,
      value.courseId,
    );
  }

  @Mutation(() => Student, { name: 'removeStudentFromCourse' })
  removeStudentFromCourse(
    @Args('removeStudentFromCourse')
    value: StudentCourseInput,
  ) {
    return this.studentService.deleteStudentFromCourse(
      value.studentId,
      value.courseId,
    );
  }
}
