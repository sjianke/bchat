import type { Context, Next, Middleware } from 'koa'

import { BaseException } from '@core/exceptions'
import { Response } from '@utils/response'
import { HTTP_STATUS } from '@core/constants'

export function errorHandler(): Middleware {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err) {
      if (err instanceof BaseException) {
        ctx.status = err.status
        ctx.body = Response.fail(err.message, err.status)
      } else {
        ctx.status = HTTP_STATUS.INTERNAL_ERROR
        ctx.body = Response.fail('Internal Server Error')
      }

      // 错误日志
      console.error(err)
    }
  }
}
