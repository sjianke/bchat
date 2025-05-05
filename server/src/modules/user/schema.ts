import joi from 'joi'

const email = joi.string().email().required()
const username = joi.string().min(2).max(16).required()
const password = joi.string().min(6).max(32).required()

export const signup = joi.object({
  username,
  password,
  email,
})

export const login = joi.object({
  username,
  password,
})
