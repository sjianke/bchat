import jwt from 'jsonwebtoken'
import type { IUser } from '@modules/user/types'
import { AuthenticationException } from '@core/exceptions'

type IJWTUser = Pick<IUser, 'id' | 'username'>

export interface IAuthenticatorOptions {
  /** 密钥 */
  secretKey: string
  /** expires 授权时间 */
  expiresIn?: string
}

export interface IAuthenticator {
  verify(token: string): Promise<any>
  sign(user: IJWTUser): string
}

/** JWT 认证器
 * @constructor
 * @param {string} [secret=secretKey] - 密钥
 */
export class JWTAuthenticator implements IAuthenticator {
  private options: IAuthenticatorOptions = {
    secretKey: 'secretKey',
    expiresIn: '1h',
  }

  constructor(options?: IAuthenticatorOptions) {
    this.options = Object.assign({}, this.options, options)
  }

  /**
   * 签发 JWT
   * @param {Object} authUser
   * @param {string} authUser.id - 用户ID
   * @param {string} authUser.username - 用户名称
   */
  public sign(authUser: IJWTUser): string {
    const { secretKey, expiresIn } = this.options

    return jwt.sign(authUser, secretKey, {
      expiresIn,
    })
  }

  /**
   * 验证 JWT
   * @param {string} token - 令牌
   */
  public async verify(token: string) {
    const { secretKey } = this.options

    try {
      return jwt.verify(token, secretKey)
    } catch (error) {
      throw new AuthenticationException('Invalid token-令牌无效')
    }
  }
}
