import { LocationType } from 'models/location'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import {
  CreateLocationFields,
  UpdateLocationFields,
} from 'hooks/react-hook-form/useCreateUpdateLocation'

export const fetchLocations = async () =>
  apiRequest<never, LocationType>('get', apiRoutes.LOCATIONS_PREFIX)

export const createLocation = async (data: CreateLocationFields) =>
  apiRequest<CreateLocationFields, void>(
    'post',
    apiRoutes.LOCATIONS_PREFIX,
    data,
  )

export const updateLocation = async (data: UpdateLocationFields, id: number) =>
  apiRequest<UpdateLocationFields, void>(
    'patch',
    `${apiRoutes.LOCATIONS_PREFIX}/${id}`,
    data,
  )