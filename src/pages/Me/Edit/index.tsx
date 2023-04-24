import Layout from 'components/ui/Layout'
import UpdateUserForm from 'components/user/UpdateUserForm'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const UserEdit: FC = () => {
  const location = useLocation()
  return (
    <Layout>
      <UpdateUserForm defaultValues={location.state.data} />
    </Layout>
  )
}

export default UserEdit
