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
  image_url?: string
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
    image_url: Yup.string().notRequired(),
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      image_url: '',
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
    setValue,
    errors,
    control,
  }
}

export type CreateUpdateLocationForm = ReturnType<
  typeof useCreateUpdateLocationForm
>
