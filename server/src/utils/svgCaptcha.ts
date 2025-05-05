import svgCaptcha, { CaptchaObj, ConfigObject } from 'svg-captcha'

export interface ICaptchaGenerator {
  generateCaptcha(): CaptchaObj
  verifyCaptcha(userInputCaptcha: string, storedCaptcha: string): boolean
}

/**
 * 验证码生成器
 */
export class CaptchaGenerator implements ICaptchaGenerator {
  private options: ConfigObject = {}

  constructor(options?: ConfigObject) {
    this.options = Object.assign({}, this.options, options)
  }

  /**
   * 生成验证码
   * @returns {string} 验证码的 SVG 字符串
   */
  generateCaptcha(): CaptchaObj {
    const captcha = svgCaptcha.create(this.options)

    return captcha
  }

  /**
   * 验证用户输入的验证码
   * @param {string} userInputCaptcha - 用户输入的验证码
   * @returns {boolean} 验证结果
   */
  verifyCaptcha(userInputCaptcha: string, storedCaptcha: string): boolean {
    return storedCaptcha.toLowerCase() === userInputCaptcha.toLowerCase()
  }
}

export default CaptchaGenerator
