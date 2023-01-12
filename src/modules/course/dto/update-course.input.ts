import { InputType, Field } from '@nestjs/graphql';

@InputType()
class UpdateCourseInput {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  price: string;
}

export default UpdateCourseInput;
