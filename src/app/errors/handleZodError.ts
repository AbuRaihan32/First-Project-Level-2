import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interfaces/error';

const ZodErrorHandler = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  const message = 'Zod Validation Error!';

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default ZodErrorHandler;
