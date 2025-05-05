import type { Context, Next, Middleware } from 'koa'
import type { JWTAuthenticator } from '@utils/jwtAuthenticator'

import { ERROR_MESSAGES, HTTP_STATUS } from '@core/constants'
import { AuthenticationException, BaseException } from '@core/exceptions'
import { Response } from '@utils/response'

/** 认证中间件 */
export function authenticate(jwt: JWTAuthenticator): Middleware {
  return async (ctx: Context, next: Next) => {
    try {
      const token = ctx.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        throw new AuthenticationException('No token provided')
      }

      const payload = await jwt.verify(token)

      ctx.state.user = payload
      await next()
    } catch (error) {
      if (error instanceof BaseException) {
        ctx.status = error.status
        ctx.body = Response.unauthorized(error.message)
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
