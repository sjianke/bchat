import Router from '@koa/router'
import type { Container } from '@core/container'
import { createUserRoutes } from './routes'
import { UserController } from './controller'
import { UserService } from './service'
import { UserModel } from './model'

/**
 * 注册用户模块
 *
 * @param parentRouter - 父路由
 * @param container - 容器
 */
export function registerUserModule(
  parentRouter: Router,
  container: Container
): void {
  const router = new Router({
    prefix: '/user',
  })
  const userModel = new UserModel(container.resolve('db'))
  const userService = new UserService(
    userModel,
    container.resolve('bcryptHash'),
    container.resolve('jwtAuth')
  )
  const userController = new UserController(userService)

  createUserRoutes(router, userController, container)

  parentRouter.use(router.routes(), router.allowedMethods())
}
