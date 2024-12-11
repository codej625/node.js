import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // response.status(status)에 (status)값은 Response객체의 statusCode값이다.
    res.status(status).json({
      statusCode: status,
      timestamp: DateTime.now().setZone('Asia/Seoul').toISO(),
      path: req.url,
    });
  }
}
