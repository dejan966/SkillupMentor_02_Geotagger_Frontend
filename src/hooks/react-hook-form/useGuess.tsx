import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface GuessUserFields {
  latitude: number
  longitude: number
  errorDistance: number
}

export const useGuess = () => {
  const GuessSchema = Yup.object().shape({
    image_url: Yup.string().notRequired(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    errorDistance: Yup.number().notRequired(),
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      latitude: 0,
      longitude: 0,
      errorDistance: 0,
    },
    mode: 'onSubmit',
    resolver: yupResolver(GuessSchema),
  })

  return {
    handleSubmit,
    setValue,
    errors,
    control,
  }
}

export type GuessForm = ReturnType<typeof useGuess>
