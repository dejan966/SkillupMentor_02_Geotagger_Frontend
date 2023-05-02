import { yupResolver } from '@hookform/resolvers/yup'
import { LocationType } from 'models/location'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface CreateLocationFields {
  name?: string
  latitude: number
  longitude: number
}

export interface UpdateLocationFields {
  name?: string
  latitude?: number
  longitude?: number
}

interface Props {
  defaultValues?: LocationType
}

export const useCreateUpdateLocationForm = ({ defaultValues }: Props) => {
  const CreateLocationSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
  })

  const UpdateLocationSchema = Yup.object().shape({
    name: Yup.string().notRequired(),
    latitude: Yup.number().notRequired(),
    longitude: Yup.number().notRequired(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: '',
      latitude: 0.0,
      longitude: 0.0,
      ...defaultValues,
    },
    mode: 'onSubmit',
    resolver: defaultValues
      ? yupResolver(UpdateLocationSchema)
      : yupResolver(CreateLocationSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type CreateUpdateLocationForm = ReturnType<
  typeof useCreateUpdateLocationForm
>
