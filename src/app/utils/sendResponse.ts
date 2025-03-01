import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  status: number;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
