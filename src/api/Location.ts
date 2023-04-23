import { LocationType } from "models/location";
import { apiRequest } from "./Api";
import { apiRoutes } from "constants/apiConstants";

export const fetchLocations = async () =>
    apiRequest<never, LocationType>('get', apiRoutes.LOCATIONS)