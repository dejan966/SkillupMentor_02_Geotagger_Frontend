import { GuessType } from 'models/guess'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import { GuessUserFields } from 'hooks/react-hook-form/useGuess'

export const fetchPersonalBest = async (pageNumber:number) =>
  apiRequest<never, GuessType[]>('get', `${apiRoutes.GUESSES_PREFIX}?page=${pageNumber}`)

export const makeGuess = async (data:GuessUserFields, locationId:number) =>
  apiRequest<GuessUserFields, void>('post', `${apiRoutes.GUESS_LOCATION_PREFIX}/${locationId}`, data)

export const getLocationFromGuess = async (locationId:number) =>
  apiRequest<never, GuessType>('get', `${apiRoutes.GUESS_LOCATION_PREFIX}/${locationId}`)
