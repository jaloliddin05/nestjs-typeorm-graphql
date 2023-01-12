import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from '../student/student.entity';

@ObjectType()
@Entity({ name: 'course' })
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  price: string;

  @ManyToMany(() => Student, (student) => student.courses)
  @Field(() => [Student], { nullable: true })
  students: Student[];
}
