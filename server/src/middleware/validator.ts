import type { Context, Next, Middleware } from 'koa'
import { type Schema, ValidationError } from 'joi'

import { ERROR_MESSAGES, HTTP_STATUS } from '@core/constants'
import { Response } from '@utils/response'

/** 验证中间件 */
export function validate(schema: Schema): Middleware {
  return async (ctx: Context, next: Next) => {
    try {
      const value = await schema.validateAsync(ctx.request.body, {
        abortEarly: false, // 在第一个错误时停止验证 false
      })

      ctx.request.body = value
      await next()
    } catch (error) {
      if (error instanceof ValidationError) {
        ctx.status = HTTP_STATUS.BAD_REQUEST
        ctx.body = Response.invalid(
          error.details.map((d) => d.message).join(', ')
        )
      } else {
        ctx.status = HTTP_STATUS.INTERNAL_ERROR
        ctx.body = Response.fail(
          ERROR_MESSAGES.INTERNAL_ERROR,
          HTTP_STATUS.INTERNAL_ERROR
        )
      }
    }
  }
}
