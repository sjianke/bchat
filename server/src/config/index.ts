import database from './database'
import jwt from './jwt'
import session from './session'

export default {
  port: 3000,
  database,
  jwt,
  session,
  env: process.env.NODE_ENV || 'development',
}
