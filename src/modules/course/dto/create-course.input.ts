import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateCourseInput {
  @Field()
  title: string;
  @Field()
  price: string;
}
export default CreateCourseInput;
