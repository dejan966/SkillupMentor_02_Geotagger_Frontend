import {
  UpdateUserFields,
  useUpdateUserForm,
} from 'hooks/react-hook-form/useUpdateUser'
import { useNavigate } from 'react-router-dom'

const PasswordResetForm = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useUpdateUserForm({})

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleChange(data as UpdateUserFields)
  })

  const handleChange = async (data: UpdateUserFields) => {
    
  }

  return (
    <div className="text-start text forms">
      <h1>
        Reset your <span className="green">password</span>
      </h1>
    </div>
  )
}

export default PasswordResetForm
