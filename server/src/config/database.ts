import type { PoolOptions } from 'mysql2/promise'

/**
 * 数据库配置
 */
export default {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'bchat_db', // 数据库
  connectionLimit: 10,
  waitForConnections: true,
} as PoolOptions
