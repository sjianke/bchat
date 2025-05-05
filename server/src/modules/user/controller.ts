import type { Context } from 'koa'
import type { UserService } from './service'
import type { IUserLoginDTO, IUserCreateDTO, IUserUpdateDTO } from './types'

import BaseController from '@core/base/Controller'

/**
 * 用户控制器
 */
export class UserController extends BaseController<UserService> {
  constructor(service: UserService) {
    super(service)
  }

  async signup(ctx: Context) {
    await this.exec(ctx, async () => {
      return await this.service.signup(ctx.request.body as IUserCreateDTO)
    })
  }

  async login(ctx: Context) {
    await this.exec(ctx, async () => {
      const data = await this.service.login(ctx.request.body as IUserLoginDTO)
      const loginData = {
        last_login_at: new Date(),
        last_login_ip: ctx.ip,
      }

      await this.service.updateUser(data.id, loginData)

      return {
        ...data,
        ...loginData,
      }
    })
  }

  async update(ctx: Context) {
    await this.exec(ctx, async () => {
      return await this.service.updateUser(
        ctx.state.user.id,
        ctx.request.body as IUserUpdateDTO
      )
    })
  }

  async me(ctx: Context) {
    await this.exec(ctx, async () => {
      return await this.service.findById(ctx.state.user.id)
    })
  }

  async cancel(ctx: Context) {
    await this.exec(ctx, async () => {
      const { id } = ctx.state.user
      return await this.service.deleteUser(id)
    })
  }

  /** TODO 更改密码 */
  async changePassword(ctx: Context) {}
}
