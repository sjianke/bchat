/** HTTP状态码 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const

/** 错误消息 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  VALIDATION_FAILED: 'Validation Failed',
  DATABASE_ERROR: 'Database Error',
  INTERNAL_ERROR: 'Internal Server Error',
} as const
