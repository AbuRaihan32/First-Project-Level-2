import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic Department name mast be string!',
      required_error: 'academic name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academic faculty mast be a string!',
      required_error: 'academic faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic Department name mast be string!',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academic faculty mast be a string!',
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
