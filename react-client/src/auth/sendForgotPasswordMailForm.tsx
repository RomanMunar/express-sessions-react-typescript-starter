import { useState, Dispatch, SetStateAction } from 'react'
import { forgotPassword, IUser } from '../authFetchers'
import toast from 'react-hot-toast'
import { Modal } from '../components'

const notify = (type: 'loading' | 'error' | 'success', message: string) => {
  if (type === 'success') {
    toast.success(message)
  } else if (type === 'error') {
    toast.error(message)
  } else {
    toast.loading(message)
  }
  return { dismiss: () => toast.dismiss() }
}

const sendForgotPasswordMailForm = ({
  isSendForgotPasswordMailFormOpen,
  setSendForgotPasswordMailForm,
  user,
}: {
  isSendForgotPasswordMailFormOpen: boolean
  setSendForgotPasswordMailForm: Dispatch<SetStateAction<boolean>>
  user: IUser
}) => {
  const [email, setEmail] = useState('')
  const toggleMenu = () => setSendForgotPasswordMailForm(p => !p)

  const onForgotPassword = async () => {
    if (!user) return
    const { dismiss: sendMailDismiss } = notify('loading', 'Sending an email...')
    const result = await forgotPassword(user.email)
    sendMailDismiss()
    if (typeof result === 'object') {
      notify('success', result.message)
    } else {
      notify('error', result)
    }
  }

  return (
    <Modal
      isOpen={isSendForgotPasswordMailFormOpen}
      setOpen={setSendForgotPasswordMailForm}
    >
      <div className="flex flex-col items-center justify-center h-64 p-4 mx-auto space-y-2 bg-gray-700 rounded shadow text-gray-50">
        <h2 className="text-xl font-bold">Send Forgot Password Mail</h2>
        <label htmlFor="email" className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            name="email"
            type="email"
            className="px-2 py-1 bg-gray-600 rounded shadow focus:ring-2 focus:outline-none ring-yellow-400"
          />
        </label>
        <button
          onClick={onForgotPassword}
          className="px-3 py-1 mt-3 font-medium transition bg-yellow-600 rounded shadow w-60 text-md focus:bg-yellow-700 hover:bg-yellow-500 active:bg-gray-700 focus:ring-2 focus:outline-none ring-yellow-400"
        >
          Submit
        </button>
      </div>
    </Modal>
  )
}
export default sendForgotPasswordMailForm
