import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
  LoginForm,
  RegisterForm,
  ResendEmailVerificationForm,
  SendForgotPasswordMailForm,
} from './auth'
import {
  getUser,
  IUser,
  login,
  LoginFields,
  logout,
  register,
  RegisterFields,
} from './authFetchers'
import { Nav, UserCard } from './components'

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

function App() {
  const [user, setUser] = useState<IUser | undefined>()
  const [isSendForgotPasswordMailFormOpen, setSendForgotPasswordMailForm] = useState(
    false
  )
  const [isResendEmailVerificationFormOpen, setResendEmailVerificationForm] = useState(
    false
  )

  const onResendEmailVerification = async () => {
    setResendEmailVerificationForm(p => !p)
  }

  const onForgotPassword = async () => {
    setSendForgotPasswordMailForm(p => !p)
  }

  const onLogin = async (body: LoginFields) => {
    const { dismiss: loginToastDismiss } = notify('loading', 'Logging in...')
    const result = await login(body)
    loginToastDismiss()
    if (typeof result === 'object') {
      notify('success', 'Successfully logged in')
      setUser(result)
    } else {
      notify('error', result)
    }
  }

  const onRegister = async (body: RegisterFields) => {
    const { dismiss: registerToastDismiss } = notify('loading', 'Signing in...')
    const result = await register(body)
    registerToastDismiss()
    if (typeof result === 'object') {
      notify('success', 'Successfully signed in')
      setUser(result)
    } else {
      notify('error', result)
    }
  }

  const onLogout = async () => {
    const { dismiss: logoutToastDismiss } = notify('loading', 'Logging out...')
    const result = await logout()
    logoutToastDismiss()
    if (result === 'Successfully logged out') {
      notify('success', result)
      setUser(p => undefined)
    } else {
      notify('error', result)
    }
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getUser()
      if (typeof user === 'object') {
        setUser(user)
      }
    }

    getCurrentUser()
  }, [])

  return (
    <div className="min-h-screen text-gray-100 bg-gray-900">
      <Toaster toastOptions={{ style: { background: '#4B5563', color: '#F3F4F6' } }} />
      <Nav
        user={user}
        onResendEmailVerification={onResendEmailVerification}
        onForgotPassword={onForgotPassword}
        onLogout={onLogout}
      />
      {!user ? (
        <div className="flex flex-col w-full max-w-3xl m-auto md:flex-row">
          <div className="w-full p-4">
            <LoginForm onForgotPassword={onForgotPassword} onLogin={onLogin} />
          </div>
          <div className="w-full p-4">
            <RegisterForm onRegister={onRegister} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex p-4 mx-auto">
            <div className="mx-auto">
              <UserCard
                onLogout={onLogout}
                user={user}
                setResendEmailVerificationForm={setResendEmailVerificationForm}
              />
            </div>
          </div>
          <SendForgotPasswordMailForm
            user={user}
            isSendForgotPasswordMailFormOpen={isSendForgotPasswordMailFormOpen}
            setSendForgotPasswordMailForm={setSendForgotPasswordMailForm}
          />

          <ResendEmailVerificationForm
            user={user}
            isResendEmailVerificationFormOpen={isResendEmailVerificationFormOpen}
            setResendEmailVerificationForm={setResendEmailVerificationForm}
          />
        </>
      )}
      <div className="min-h-screen"></div>
    </div>
  )
}

export default App
