import { HTTP_STATUS, ERROR_MESSAGES } from '@core/constants'
import { THttpStatusCode, IBaseResponse } from '@core/types'

/**
 * 响应工具类
 */
export class Response {
  /**
   * 成功响应
   * @param [data=null] 数据
   * @param [msg='success'] 成功消息
   * @param [code=HTTP_STATUS.OK] 成功状态码
   * @returns
   */
  static ok<T>(
    data: T | null = null,
    msg = 'success',
    code: THttpStatusCode = HTTP_STATUS.OK
  ): IBaseResponse<T> {
    return {
      code,
      msg,
      data,
    }
  }

  /**
   * 失败响应
   * @param [msg='unsuccess'] 错误消息
   * @param [code=HTTP_STATUS.INTERNAL_ERROR] 错误状态码
   * @returns
   */
  static fail(
    msg = 'unsuccess',
    code: THttpStatusCode = HTTP_STATUS.INTERNAL_ERROR
  ): IBaseResponse<null> {
    return {
      code,
      msg,
      data: null,
    }
  }

  /**
   * 无效响应
   * @param [msg=ERROR_MESSAGES.VALIDATION_FAILED] 错误消息
   * @returns
   */
  static invalid(
    msg: string = ERROR_MESSAGES.VALIDATION_FAILED
  ): IBaseResponse<null> {
    return this.fail(msg, HTTP_STATUS.BAD_REQUEST)
  }

  /**
   * 未授权响应
   * @param [msg=ERROR_MESSAGES.UNAUTHORIZED] 错误消息
   * @returns
   */
  static unauthorized(
    msg: string = ERROR_MESSAGES.UNAUTHORIZED
  ): IBaseResponse<null> {
    return this.fail(msg, HTTP_STATUS.UNAUTHORIZED)
  }
}
