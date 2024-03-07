import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  public catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An database unexpected error occurred.';
    const context = 'Database';

    if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'A conflict occurred due to a unique constraint violation.';
    }

    response.status(status).json({
      statusCode: status,
      message,
      context,
    });
  }
}
