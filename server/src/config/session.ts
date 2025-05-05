import type { opts } from 'koa-session'

/**
 * session 配置
 */
export default {
  key: 'koa:sess', // 设置 session 的键名
  maxAge: 86400000, // 设置 session 的最大有效期，单位为毫秒 24 小时
  overwrite: true, // 是否覆盖已有的 session
  httpOnly: true, // 是否仅通过 HTTP 协议访问 session
  signed: true, // 是否使用签名
  rolling: false, // 是否在每次请求时刷新 session 的过期时间
  renew: false, // 是否在 session 即将过期时自动更新 session
} as opts
