import { UserType } from './auth'

export type LocationType = {
    id: number
    name:string
    image_url:string
    latitude:number
    longitude:number
    user:UserType
}