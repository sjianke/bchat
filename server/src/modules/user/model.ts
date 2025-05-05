import { DatabaseException } from '../../core/exceptions'
import BaseModel from '../../core/base/Model'
import { USER_STATUS } from './constants'
import type { IQueryOptions } from '../../core/types'
import type { IUser, IUserCreateDTO, IUserUpdateDTO } from './types'
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'

// 定义User查询结果接口
interface UserRow extends IUser, RowDataPacket {}

export class UserModel extends BaseModel {
  constructor(db: Pool) {
    super(db, 'users')
  }

  async create(data: IUserCreateDTO): Promise<boolean> {
    const sql = `INSERT INTO ${this.tb} SET ?`
    try {
      const [result] = await this.query<ResultSetHeader>(sql, [data])

      return result.affectedRows > 0
    } catch (error) {
      throw new DatabaseException('Failed to create user')
    }
  }

  async findById(id: string): Promise<IUser | null> {
    const sql = `SELECT * FROM ${this.tb} WHERE id = ? AND status = ?`
    const [rows] = await this.query<UserRow[]>(sql, [
      id,
      String(USER_STATUS.ACTIVE),
    ])

    return rows[0] || null
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const sql = `SELECT * FROM ${this.tb} WHERE username = ?`
    const [rows] = await this.query<UserRow[]>(sql, [username])

    return rows[0] || null
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const sql = `SELECT * FROM ${this.tb} WHERE email = ?`
    const [rows] = await this.query<UserRow[]>(sql, [email])

    return rows[0] || null
  }

  async update(id: string, data: IUserUpdateDTO): Promise<boolean> {
    const sql = `UPDATE ${this.tb} SET ? WHERE id = ?`
    const [result] = await this.query<ResultSetHeader>(sql, [data, id])

    return result.affectedRows > 0
  }

  async delete(id: string): Promise<boolean> {
    const sql = `DELETE FROM ${this.tb} WHERE id = ?`
    const [result] = await this.query<ResultSetHeader>(sql, [id])

    return result.affectedRows > 0
  }

  async findAll(
    options?: IQueryOptions
  ): Promise<{ items: IUser[]; total: number }> {
    const { pagination, orderBy } = options || {}
    const { page = 1, limit = 10 } = pagination || {}

    let sql = `SELECT * FROM ${this.tb} WHERE status = ?`

    const params: number[] = [USER_STATUS.ACTIVE]

    if (orderBy) {
      sql += ` ORDER BY ${orderBy.field} ${orderBy.direction}`
    }

    sql += ` LIMIT ? OFFSET ?`

    params.push(limit, (page - 1) * limit)

    const [rows] = await this.query<UserRow[]>(sql, params)
    const [totalResult] = await this.query<
      (RowDataPacket & { total: number })[]
    >(`SELECT COUNT(*) as total FROM ${this.tb} WHERE status = ?`, [
      USER_STATUS.ACTIVE,
    ])

    return { items: rows, total: totalResult[0].total }
  }
}
