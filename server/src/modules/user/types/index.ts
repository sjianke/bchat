import { IBaseEntity } from '@core/types'
import { USER_STATUS } from '../constants'

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]

export interface IUser extends IBaseEntity {
  email: string
  username: string
  password: string
  status: UserStatus
  phone?: string
  avatar?: string
}

export type IUserLoginDTO = Pick<IUser, 'username' | 'password'>

export type IUserCreateDTO = Pick<IUser, 'username' | 'password' | 'email'>

export type IUserUpdateDTO = Partial<IUser>

export interface IUserLoginResponse extends Omit<IUser, 'password'> {
  token: string
}

export interface IUserResponse extends Omit<IUser, 'password'> {}
