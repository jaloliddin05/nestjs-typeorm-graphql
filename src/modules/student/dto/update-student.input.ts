import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdateStudentInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;
}

export default UpdateStudentInput;
