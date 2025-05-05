import type { Context } from 'koa'
import { BaseException } from '../exceptions'
import { Response } from '@utils/response'
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants'
import { THttpStatusCode } from '@core/types'

export default abstract class BaseController<TService> {
  protected service: TService

  constructor(service: TService) {
    this.service = service
  }

  /** 执行操作 统一处理 */
  protected async exec<T>(
    ctx: Context,
    action: () => Promise<T>,
    msg: string = 'success',
    code: THttpStatusCode = HTTP_STATUS.OK
  ) {
    try {
      const data = await action()
      ctx.status = code
      ctx.body = Response.ok(data, msg, code)
    } catch (error) {
      this.fail(ctx, error)
    }
  }

  /** 处理错误 */
  private fail(ctx: Context, error: any) {
    if (error instanceof BaseException) {
      ctx.status = error.status
      ctx.body = Response.fail(error.message, error.status)
    } else {
      ctx.status = HTTP_STATUS.INTERNAL_ERROR
      ctx.body = Response.fail(
        ERROR_MESSAGES.INTERNAL_ERROR,
        HTTP_STATUS.INTERNAL_ERROR
      )
    }
  }
}
