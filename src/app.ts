import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/Students/student.router';
import { userRoutes } from './app/modules/Users/user.router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// * parsers
app.use(express.json());

app.use(cors());

// application routes :
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
export default app;
