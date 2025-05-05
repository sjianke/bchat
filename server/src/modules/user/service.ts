import type { UserModel } from './model'
import type {
  IUser,
  IUserCreateDTO,
  IUserLoginDTO,
  IUserResponse,
  IUserLoginResponse,
  IUserUpdateDTO,
} from './types'
import type BCryptHash from '@utils/bcryptHash'
import type { JWTAuthenticator } from '@utils/jwtAuthenticator'

import BaseService from '@core/base/Service'
import { AuthenticationException } from '@core/exceptions'

export class UserService extends BaseService<UserModel> {
  private bcryptHash: BCryptHash
  private jwtAuth: JWTAuthenticator

  constructor(
    model: UserModel,
    bcryptHash: BCryptHash,
    jwtAuth: JWTAuthenticator
  ) {
    super(model)

    this.bcryptHash = bcryptHash
    this.jwtAuth = jwtAuth
  }

  /** 清理用户数据 */
  private sanitizeUser(user: IUser): IUserResponse {
    const { password, ...sanitizedUser } = user
    return sanitizedUser
  }

  async signup(data: IUserCreateDTO): Promise<null> {
    return this.exec(async () => {
      const existingUser = await this.model.findByUsername(data.username)
      const existingEmail = await this.model.findByEmail(data.email)

      if (existingUser) {
        throw new AuthenticationException('Username already exists')
      }

      if (existingEmail) {
        throw new AuthenticationException('Email already exists')
      }

      const hashedPassword = await this.bcryptHash.encrypt(data.password)

      return await this.model.create({
        ...data,
        password: hashedPassword,
      })
    })
  }

  async login(data: IUserLoginDTO): Promise<IUserLoginResponse> {
    return this.exec(async () => {
      let user: IUser | null = null

      if (data.username.match(/^[\w-\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/)) {
        user = await this.model.findByEmail(data.username)
      } else {
        user = await this.model.findByUsername(data.username)
      }

      if (!user) {
        throw new AuthenticationException('User or email not found')
      }

      const isValid = await this.bcryptHash.verify(data.password, user.password)

      if (!isValid) {
        throw new AuthenticationException('Invalid password')
      }

      const token = this.jwtAuth.sign({
        id: user.id,
        username: user.username,
      })

      return {
        ...this.sanitizeUser(user),
        token,
      }
    })
  }

  // TODO 更新信息有可能传入id email username password 等
  async updateUser(userId: string, data: IUserUpdateDTO): Promise<boolean> {
    return this.exec(async () => {
      return await this.model.update(userId, data)
    })
  }

  async deleteUser(id: string): Promise<void> {
    return this.exec(async () => {
      await this.model.delete(id)
    })
  }

  async findById(id: string): Promise<IUserResponse | null> {
    return this.exec(async () => {
      const user = await this.model.findById(id)
      return user && this.sanitizeUser(user)
    })
  }
}
