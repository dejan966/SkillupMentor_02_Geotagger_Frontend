export enum apiRoutes {
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  SIGNOUT = '/auth/signout',
  ME = '/users/me',
  REFRESH_TOKENS = '/auth/refresh',
  FETCH_USERS = '/users',
  USERS_PREFIX = '/users',
  PASSWORD_RESET = '/users/me/reset-password',
  UPLOAD_AVATAR_IMAGE = '/users/upload',
  UPLOAD_LOCATION_IMAGE = '/locations/upload',
  GET_AVATAR_IMAGE = '/users/get/image',
  ME_LOCATIONS = 'locations/me',
  LOCATIONS_PREFIX = '/locations',
  UPDATE_LOCATION = '/locations',
  GUESSES_PREFIX = '/guesses',
  ME_GUESSES = '/guesses/me',
  GUESS_LOCATION_PREFIX = '/guesses/location'
} 