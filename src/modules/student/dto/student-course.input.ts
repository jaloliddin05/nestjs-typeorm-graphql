import { Field, InputType } from '@nestjs/graphql';

@InputType()
class StudentCourseInput {
  @Field()
  studentId: string;

  @Field()
  courseId: string;
}

export default StudentCourseInput;
