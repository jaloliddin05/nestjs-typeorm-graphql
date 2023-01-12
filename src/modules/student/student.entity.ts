import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from '../course/course.entity';

@ObjectType()
@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  age: number;

  @ManyToMany(() => Course, (course) => course.students)
  @Field(() => [Course], { nullable: true })
  @JoinTable()
  courses: Course[];
}
