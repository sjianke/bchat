import { Pool, FieldPacket, QueryResult } from 'mysql2/promise'
import { DatabaseException } from '../exceptions'

/** 模型基类 */
export default abstract class BaseModel {
  /** 数据库连接池 */
  protected db: Pool
  /** 表名 */
  protected tb: string

  constructor(db: Pool, tb: string) {
    this.db = db
    this.tb = tb
  }

  /**
   * 执行 SQL 查询
   * @param sql 查询语句
   * @param params 查询参数
   * @returns 返回查询的结果
   */
  protected async query<T extends QueryResult>(
    sql: string,
    values?: any
  ): Promise<[T, FieldPacket[]]> {
    try {
      // 执行查询并返回结果
      const result = await this.db.query<T>(sql, values)
      return result
    } catch (error: any) {
      // 处理数据库异常
      throw new DatabaseException(error.message)
    }
  }
}
