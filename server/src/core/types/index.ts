import { HTTP_STATUS } from '@core/constants'

export type THttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

export interface Constructor<T = any> {
  new (...args: any[]): T
}

export interface IBaseEntity {
  id: string
  last_login_at?: Date
  last_login_ip?: string
  created_at: Date
}

export interface IBaseResponse<T = any> {
  code: THttpStatusCode
  msg: string
  data: T | null
}

export interface IPagination {
  page: number
  limit: number
  total: number
}

export interface IPaginatedResponse<T> extends IBaseResponse {
  data: {
    items: T[]
    pagination: IPagination
  }
}

export interface IQueryOptions {
  pagination?: Partial<IPagination>
  orderBy?: {
    field: string
    direction: 'ASC' | 'DESC'
  }
}
