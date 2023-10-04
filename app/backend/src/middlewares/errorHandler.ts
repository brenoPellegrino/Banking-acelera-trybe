import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

const errorHandler : ErrorRequestHandler = (
  err: { message: string, status: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message });
};

export default errorHandler;