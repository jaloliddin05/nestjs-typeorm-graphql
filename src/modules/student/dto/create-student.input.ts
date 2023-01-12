import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CreateStudentInput {
  @Field()
  name: string;

  @Field()
  age: number;
}

export default CreateStudentInput;
