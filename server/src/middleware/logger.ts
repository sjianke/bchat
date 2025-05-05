import { Context, Next } from 'koa'

// 日志中间件
const logger = async (ctx: Context, next: Next) => {
  const start = Date.now()
  await next() // 执行后续中间件
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

export default logger
