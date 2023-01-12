import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CreateCourseInput, UpdateCourseInput } from './dto';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course, { name: 'createCourse' })
  createCourse(
    @Args('CreateCourseInput') CreateCourseInput: CreateCourseInput,
  ): Promise<Course> {
    return this.courseService.create(CreateCourseInput);
  }

  @Query(() => [Course], { name: 'findAllCourses' })
  findAll() {
    return this.courseService.getMany();
  }

  @Query(() => Course, { name: 'findOneCourse' })
  findOne(@Args('id') id: string) {
    return this.courseService.getOne(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args('UpdateCourseInput') updateProjectInput: UpdateCourseInput,
  ) {
    return this.courseService.update(updateProjectInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id') id: string) {
    return this.courseService.delete(id);
  }
}
