import Layout from 'components/ui/Layout'
import UpdatePasswordForm from 'components/user/UpdatePasswordForm'
import Page404 from 'pages/Page404'
import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as API from 'api/Api'
import { useQuery } from 'react-query'

const UserPasswordEdit: FC = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')

  const [tokenExpiration, setTokenExpiration] = useState<Date>()
  const [tokenFromDB, setTokenFromDB] = useState()

  useQuery(['password_token_info'], () => API.fetchTokenInfo(queryToken!), {
    onSuccess(data) {
      setTokenExpiration(data.data.token_expiry_date)
      setTokenFromDB(data.data.token)
    },
    refetchOnWindowFocus: false,
  })

  const currTime = new Date().toLocaleTimeString()
  const tokenExpTime = new Date(tokenExpiration!).toLocaleTimeString()

  return (
    <>
      {queryToken ? (
        <Layout>
          {queryToken === tokenFromDB && currTime < tokenExpTime ? (
            <UpdatePasswordForm />
          ) : (
            <h1>Invalid token</h1>
          )}
        </Layout>
      ) : (
        <Page404 />
      )}
    </>
  )
}

export default UserPasswordEdit
