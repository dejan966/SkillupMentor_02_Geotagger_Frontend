import { UserType } from './auth'
import { LocationType } from './location'

export type GuessType = {
    id:number
    latitude:number
    longitude:number
    errorDistance:number
    created_at:string
    location:LocationType
    user:UserType
}