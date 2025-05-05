import type { Context, Middleware, Next } from 'koa'

import { HTTP_STATUS } from '@core/constants'
import { Response } from '@utils/response'

export function notFoundHandler(): Middleware {
  return async (ctx: Context, next: Next) => {
    await next()
    if (ctx.status === HTTP_STATUS.BAD_REQUEST) {
      ctx.status = HTTP_STATUS.BAD_REQUEST
      ctx.body = Response.invalid('The requested resource was not found.')
    }
  }
}
