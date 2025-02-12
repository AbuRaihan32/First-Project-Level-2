/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interfaces/error';
import config from '../config';
import ZodErrorHandler from '../errors/handleZodError';
import MongooseErrorHandler from '../errors/handleMongooseError';
import CastErrorHandler from '../errors/handleCastError';
import DuplicateErrorHandler from '../errors/handleDuplicateError';
import AppErrors from '../errors/AppErrors';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = ZodErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = MongooseErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = CastErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = DuplicateErrorHandler(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppErrors) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

/* pattern
  success,
  message,
  errorSources: [
    {  
      path: 
      message:
    }
  ]
  stack: 


*/
