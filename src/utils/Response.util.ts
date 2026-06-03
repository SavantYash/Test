import { HttpStatus } from '@nestjs/common';

export class ResponseUtil {
  static success<T>(data: T, message = 'Success') {
    return {
      status: HttpStatus.OK,
      message,
      data: {
        item: data,
      },
    };
  }

  static list<T>(items: T[], message = 'Success') {
    return {
      status: HttpStatus.OK,
      message,
      data: {
        items,
      },
    };
  }

  static error(message: string, status = HttpStatus.BAD_REQUEST, errors?: any) {
    return {
      status,
      message,
      data: {
        errors: errors || [],
      },
    };
  }
}