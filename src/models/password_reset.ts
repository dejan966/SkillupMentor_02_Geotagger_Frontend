import { UserType } from './auth'

export type PasswordResetType = {
    token:string
    user:UserType
    token_expiry_date:Date
}