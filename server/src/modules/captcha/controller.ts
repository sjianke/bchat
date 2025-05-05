import type { Context } from 'koa'

import { BaseException, ValidationException } from '@core/exceptions'
import { CaptchaGenerator } from '@utils/svgCaptcha'
import { Response } from '@utils/response'
import { ERROR_MESSAGES, HTTP_STATUS } from '@core/constants'

export class CaptchaController {
  private captcha: CaptchaGenerator

  constructor(captcha: CaptchaGenerator) {
    this.captcha = captcha
  }

  async getCaptcha(ctx: Context) {
    const captcha = this.captcha.generateCaptcha()

    ctx.session!.captcha = captcha.text
    ctx.body = Response.ok(captcha.data)
  }

  async verifyCaptcha(ctx: Context) {
    try {
      const isVerified = this.captcha.verifyCaptcha(
        ctx.request.body.captcha,
        ctx.session!.captcha
      )

      if (!isVerified) {
        throw new ValidationException('Invalid captcha')
      }

      ctx.body = Response.ok(isVerified)
    } catch (error) {
      if (error instanceof BaseException) {
        ctx.status = error.status
        ctx.body = Response.invalid(error.message)
      } else {
        ctx.status = HTTP_STATUS.INTERNAL_ERROR
        ctx.body = Response.fail(ERROR_MESSAGES.INTERNAL_ERROR)
      }
    }
  }
}
