// Core
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Types
import { PrismaErrors } from '../modules/database/types/errors.enum';

@Catch(PrismaClientKnownRequestError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  public catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An database unexpected error occurred.';
    const context = 'Database';

    if (exception.code === PrismaErrors.UniqueViolation) {
      status = HttpStatus.CONFLICT;
      message = 'A conflict occurred due to a unique constraint violation.';
    }

    if (exception.code === PrismaErrors.ForeignKeyViolation) {
      status = HttpStatus.CONFLICT;
      message = 'Conflict occurred due to a foreign key constraint violation.';
    }

    response.status(status).json({
      statusCode: status,
      message,
      context,
    });
  }
}
