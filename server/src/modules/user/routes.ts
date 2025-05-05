// src/modules/user/routes.ts
import Router from '@koa/router'
import type { Container } from '@core/container'
import { authenticate } from '@middleware/authentication'
import { validate } from '@middleware/validator'
import { UserController } from './controller'
import * as Schema from './schema'

/**
 * 创建用户路由
 *
 * @param router - 路由实例
 * @param container - 容器
 * @param userController - 用户控制器
 */
export function createUserRoutes(
  router: Router,
  userController: UserController,
  container: Container
) {
  router.post(
    '/login',
    validate(Schema.login),
    userController.login.bind(userController)
  )

  router.post(
    '/signup',
    validate(Schema.signup),
    userController.signup.bind(userController)
  )

  router.delete(
    '/cancel',
    authenticate(container.resolve('jwtAuth')),
    userController.cancel.bind(userController)
  )

  router.put(
    '/update',
    authenticate(container.resolve('jwtAuth')),
    userController.update.bind(userController)
  )

  router.get(
    '/me',
    authenticate(container.resolve('jwtAuth')),
    userController.me.bind(userController)
  )
}
