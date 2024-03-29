import { LocationType } from 'models/location'
import { apiRequest } from './Api'
import { apiRoutes } from 'constants/apiConstants'
import {
  CreateLocationFields,
  UpdateLocationFields,
} from 'hooks/react-hook-form/useCreateUpdateLocation'

export const fetchLocations = async (pageNumber: number) =>
  apiRequest<never, LocationType>(
    'get',
    `${apiRoutes.LOCATIONS_PREFIX}?page=${pageNumber}`,
  )

export const fetchLocation = async (id: number) =>
  apiRequest<undefined, LocationType>(
    'get',
    `${apiRoutes.LOCATIONS_PREFIX}/${id}`,
  )

export const uploadLocationImg = async (formData: FormData, id: number) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.LOCATIONS_PREFIX}/upload/${id}`,
    formData,
  )

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

export const deleteLocation = async (id: number) =>
  apiRequest<number, LocationType>(
    'delete',
    `${apiRoutes.LOCATIONS_PREFIX}/${id}`,
  )

export const currUserLocations = async (pageNumber: number) =>
  apiRequest<never, LocationType[]>(
    'get',
    `${apiRoutes.LOCATIONS_PREFIX}/me?page=${pageNumber}`,
  )
