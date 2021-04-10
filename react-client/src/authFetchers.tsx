import { loginSchema, registerSchema, resendEmailSchema, validate } from './validation'

export interface IUser {
  email: string
  name: string
  password: string
  verifiedAt?: Date
  avatar?: string
  authMethod: string
}

export interface RegisterFields {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}
export const register = async (body: RegisterFields) => {
  if (body.password !== body.passwordConfirmation)
    return 'Confirmation password did not matched the password'

  const isValid = await validate(registerSchema, body)

  if (isValid) {
    const response = await fetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' },
    })
    if (response.ok) return (await response.json()) as IUser

    return 'Something went wrong'
  }
  return 'Password must have one digit, one uppercase, and be 8 characters long'
}

export interface LoginFields {
  email: string
  password: string
}

export const login = async (body: LoginFields) => {
  const isValid = await validate(loginSchema, body)
  if (isValid) {
    const response = await fetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' },
    })
    if (response.ok) return (await response.json()) as IUser

    return 'Something went wrong'
  }
  return 'Password must have one digit, one uppercase, and be 8 characters long'
}

export const forgotPassword = async (email: string) => {
  const isValid = await validate(loginSchema, email)

  if (isValid) {
    const response = await fetch('/password/email', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: { 'Content-type': 'application/json' },
    })
    if (response.ok) {
      return (await response.json()) as { message: string }
    } else {
      return 'Something went wrong'
    }
  } else {
    return 'Invalid email'
  }
}

export const resendEmailVerification = async (email: string) => {
  const isValid = await validate(resendEmailSchema, email)

  if (isValid) {
    const response = await fetch('/email/resend', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: { 'Content-type': 'application/json' },
    })
    if (response.ok) {
      return (await response.json()) as { message: string }
    } else {
      return 'Something went wrong'
    }
  } else {
    return 'Invalid email'
  }
}

export const logout = async () => {
  const response = await fetch('/auth/signout')
  if (response.ok) {
    return 'Successfully logged out'
  } else {
    return 'Something went wrong'
  }
}

export const getUser = async () => {
  const response = await fetch('/home')
  if (response.ok) {
    return (await response.json()) as IUser
  }

  return 'Not logged in or session expired'
}

const { REACT_APP_OAUTH_GITHUB_LINK, REACT_APP_OAUTH_GOOGLE_LINK } = process.env

export const githubSignInLink = REACT_APP_OAUTH_GITHUB_LINK
export const googleSignInLink = REACT_APP_OAUTH_GOOGLE_LINK
