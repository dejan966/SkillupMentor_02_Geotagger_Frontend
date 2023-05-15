import Layout from 'components/ui/Layout'
import UpdatePasswordForm from 'components/user/UpdatePasswordForm'
import Page404 from 'pages/Page404'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const UserPasswordEdit: FC = () => {
  const location = useLocation()
  
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('token')
  
  return (
    <>
      {queryToken && (
        <UpdatePasswordForm token={queryToken} />
      )}
      <Page404/>
    </>
  )
}

export default UserPasswordEdit
