export interface IUser {
  _id: string
  email: string
  name: string
  authMethod: 'oauth' | 'local'
  verifiedAt?: Date
  avatar?: string
}
