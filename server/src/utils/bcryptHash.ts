import bcryptjs from 'bcryptjs'

interface IBCryptHash {
  encrypt(password: string): Promise<string>
  verify(password: string, hash: string): Promise<boolean>
}

/** 加密类 */
export default class BCryptHash implements IBCryptHash {
  /**
   * 加密密码
   * @param { string } password 原始密码
   * @returns { Promise<string> } 返回加密后的密码哈希值
   * @description 使用 bcryptjs 对密码进行加密，使用同步方法 hashSync
   * 盐值轮数为 10，用于增加密码的安全性
   */
  async encrypt(password: string): Promise<string> {
    return bcryptjs.hashSync(password, 10)
  }

  /**
   * 验证密码
   * @param { string } password 原始密码
   * @param { string } hash 已加密的密码哈希值
   * @returns { Promise<boolean> } 返回验证结果，true 表示密码匹配，false 表示密码不匹配
   * @description 使用 bcryptjs 的 compare 方法比较原始密码和加密后的哈希值是否匹配
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash)
  }
}
