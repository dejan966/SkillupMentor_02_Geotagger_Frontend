import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const Home = lazy(() => import('pages/Home'))

/* Private routes */
const UserInfo = lazy(() => import('pages/Me'))
const UserEdit = lazy(() => import('pages/Me/Edit'))
const UserProfile = lazy(() => import('pages/Me/Profile'))
const UserAllGuesses = lazy(()=>import('pages/Me/Guesses'))
const UserAllLocations = lazy(()=>import('pages/Me/Locations'))
const UserPasswordEdit = lazy(() => import('pages/Me/Update-password'))
const UserPasswordReset = lazy(() => import('pages/Me/Reset-password'))
const UserAvatarEdit = lazy(() => import('pages/Me/Update-avatar'))

const LocationsAdd = lazy(() => import('pages/Me/Mylocation/Add'))
const LocationsEdit = lazy(() => import('pages/Me/Mylocation/Edit'))

const Guess = lazy(() => import('pages/Guess/Location'))
const AllLocations = lazy(() => import('pages/Locations'))

/* Restricted routes */
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/signup',
    children: <Register />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/me',
    children: <UserInfo />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/profile',
    children: <UserProfile />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/edit',
    children: <UserEdit />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/locations',
    children: <UserAllLocations />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/guesses',
    children: <UserAllGuesses />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/reset-password',
    children: <UserPasswordReset />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/update-password',
    children: <UserPasswordEdit />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/update-avatar',
    children: <UserAvatarEdit />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/mylocation/add',
    children: <LocationsAdd />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/me/mylocation/edit/:id',
    children: <LocationsEdit />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/guess/location/:id',
    children: <Guess />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/locations',
    children: <AllLocations />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes
