import { yupResolver } from '@hookform/resolvers/yup'
import { GuessType } from 'models/guess'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface GuessUserFields {
  image_url: string
  latitude: number
  longitude: number
  errorDistance: number
}

interface Props {
  defaultValues?: GuessType
}

export const useGuess = ({ defaultValues }: Props) => {
  const GuessSchema = Yup.object().shape({
    image_url: Yup.string().required(),
    latitude: Yup.number().notRequired(),
    longitude: Yup.number().notRequired(),
    errorDistance: Yup.number().notRequired(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      image_url: '',
      latitude: 0,
      longitude: 0,
      errorDistance: 0,
      ...defaultValues
    },
    mode: 'onSubmit',
    resolver: yupResolver(GuessSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export const useLocation = () => {
  const LocationSchema = Yup.object().shape({
    image_url: Yup.string().notRequired(),
    latitude: Yup.number().notRequired(),
    longitude: Yup.number().notRequired(),
    errorDistance: Yup.number().notRequired(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      image_url: '',
      errorDistance:0
    },
    mode: 'onSubmit',
    resolver: yupResolver(LocationSchema),
  })

  return {
    handleSubmit,
    errors,
    control,
  }
}

export type GuessForm = ReturnType<typeof useGuess>
