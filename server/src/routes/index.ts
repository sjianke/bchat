import Router from '@koa/router'
import { Container } from '@core/container'
import { Response } from '@utils/response'

import { registerUserModule } from '@modules/user'
import { registerCaptchaModule } from '@modules/captcha'

/**
 * 创建根路由
 *
 * @returns {Router} 路由实例
 */
export function createRouter(): Router {
  const container = Container.getInstance()
  const router = new Router({
    prefix: '/api/v1',
  })

  registerUserModule(router, container)
  registerCaptchaModule(router, container)

  // 健康检查路由
  router.get('/health', (ctx) => {
    ctx.status = 200
    ctx.body = Response.ok({
      timestamp: new Date().toISOString(),
    })
  })

  return router
}
