import Layout from 'components/ui/Layout'
import UpdatePasswordForm from 'components/user/UpdatePasswordForm'
import Page404 from 'pages/Page404'
import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import authStore from 'stores/auth.store'

const UserPasswordEdit: FC = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')

  const [status, setStatus] = useState()

  useQuery(['password_token_info'], () => API.fetchTokenInfo(authStore.user?.id!, queryToken!), {
    onSuccess(data) {
      console.log(data)
      setStatus(data.data)
    },
  })
  return (
    <>
      {queryToken ? (
        <Layout>
          {status === true ? (
            <UpdatePasswordForm token={queryToken} />
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
