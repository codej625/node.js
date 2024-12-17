import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpApiExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    let statusMessage: object | string;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | { error: string; statusCode: number; message: string[] };
    this.logger.error(error);

    if (typeof error === 'string') {
      statusMessage = { success: true, statusCode: status, message: error };
    } else {
      statusMessage = { success: false, ...error };
    }
    response.status(status).json(statusMessage);
  }
}
