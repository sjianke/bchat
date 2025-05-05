import { HTTP_STATUS } from '@core/constants'
import { THttpStatusCode } from '@core/types'

/** 基础异常类 */
export class BaseException extends Error {
  status: THttpStatusCode

  constructor(
    message: string,
    status: THttpStatusCode = HTTP_STATUS.INTERNAL_ERROR
  ) {
    super(message)
    this.status = status
    this.name = this.constructor.name
  }
}

export class AuthenticationException extends BaseException {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

export class ValidationException extends BaseException {
  constructor(message: string = 'Validation Failed') {
    super(message, 400)
  }
}

export class DatabaseException extends BaseException {
  constructor(message: string = 'Database Error') {
    super(message, 500)
  }
}
