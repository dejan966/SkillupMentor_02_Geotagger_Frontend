import { GuessType } from 'models/guess'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'

export const fetchPersonalBest = async () =>
  apiRequest<never, GuessType>('get', apiRoutes.ME_GUESSES)
