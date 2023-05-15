import { apiRoutes } from 'constants/apiConstants'
import { PasswordResetType } from 'models/password_reset'
import { apiRequest } from './Api'

export const fetchTokenInfo = async (token: string) =>
  apiRequest<string, PasswordResetType>(
    'get',
    `${apiRoutes.PASSWORD_RESET_PREFIX}/user/${token}`,
  )

export const deleteToken = async (token: string) =>
  apiRequest<string, PasswordResetType>(
    'delete',
    `${apiRoutes.PASSWORD_RESET_PREFIX}/delete/${token}`,
  )
