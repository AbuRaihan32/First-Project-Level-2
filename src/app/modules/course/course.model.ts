import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//! middleware
courseSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

courseSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
courseSchema.pre('findOneAndUpdate', async function (next) {
  this.find({ isDeleted: { $ne: true } });

  const result = await Course.findOne(this.getQuery());
  if (!result) {
    throw new Error('the course was deleted!');
  }

  next();
});

export const Course = model<TCourse>('course', courseSchema);

const CourseFacultiesSchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculties = model<TCourseFaculty>(
  'Course-Faculty',
  CourseFacultiesSchema,
);
