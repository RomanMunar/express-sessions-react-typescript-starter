import { useState } from 'react'
import { githubSignInLink, googleSignInLink, LoginFields } from '../authFetchers'

const loginForm = ({
  onForgotPassword,
  onLogin,
}: {
  onForgotPassword: () => Promise<void>
  onLogin: (body: LoginFields) => Promise<void>
}) => {
  const [body, setBody] = useState({ email: '', password: '' })

  const onLoginSubmit = () => {
    setBody({ email: '', password: '' })
    onLogin(body)
  }

  const onGithubSignInLinkClick = () => {
    window.open(githubSignInLink, '_blank')
  }
  const onGoogleSignInLinkClick = () => {
    window.open(googleSignInLink, 'google', 'scrollbars=yes,width=650,height=500')
  }

  return (
    <div
      id="loginForm"
      className="relative flex flex-col items-center justify-center w-full max-w-md px-2 py-4 m-auto bg-gray-800 rounded shadow-xl"
    >
      <div className="absolute top-5 left-5">
        <div className="relative flex">
          <h1 className="font-medium text-md">Node Starter</h1>
          <div className="absolute top-0 w-4 h-4 bg-yellow-400 rounded-full -right-4 animate-bounce"></div>
        </div>
      </div>
      <div>
        <h2 className="mt-10 text-xl font-bold">Login</h2>
      </div>
      <div className="space-y-2 w-60">
        <label htmlFor="email" className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input
            onChange={e => {
              setBody(p => ({ ...p, email: e.target.value }))
            }}
            value={body.email}
            name="email"
            type="email"
            className="px-2 py-1 bg-gray-600 rounded shadow focus:ring-2 focus:outline-none ring-yellow-400"
          />
        </label>
        <label htmlFor="password" className="flex flex-col">
          <span className="text-sm font-medium">Password</span>
          <input
            onChange={e => {
              setBody(p => ({ ...p, password: e.target.value }))
            }}
            value={body.password}
            name="password"
            type="password"
            className="px-2 py-1 bg-gray-600 rounded shadow focus:ring-2 focus:outline-none ring-yellow-400"
          />
          <button
            onClick={onForgotPassword}
            className="inline-flex self-end text-xs text-right text-gray-300 focus:ring-2 focus:outline-none ring-yellow-400"
          >
            Forgot Password?
          </button>
        </label>
        <button
          onClick={onLoginSubmit}
          className="px-3 py-1 font-medium transition bg-yellow-600 rounded shadow w-60 text-md focus:bg-yellow-700 hover:bg-yellow-500 active:bg-gray-700 focus:ring-2 focus:outline-none ring-yellow-400"
        >
          Submit
        </button>
        <div className="flex items-center w-full">
          <span className="w-full border border-gray-600" />
          <span className="mx-4 text-gray-300">or</span>
          <span className="w-full border border-gray-600" />
        </div>
        <div className="flex flex-row w-full space-x-4 flex-items-center space-between">
          <div className="flex flex-row space-x-4 flex-items-center space-between">
            <button
              onClick={onGithubSignInLinkClick}
              className="flex items-center w-full px-2 py-2 space-x-4 bg-gray-900 rounded shadow focus:ring-2 focus:outline-none ring-yellow-400"
            >
              <svg
                className="w-5 h-5"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              <span>Github</span>
            </button>
            <button
              onClick={onGoogleSignInLinkClick}
              className="flex items-center w-full px-2 py-2 space-x-4 bg-red-600 rounded shadow focus:ring-2 focus:outline-none ring-yellow-400"
            >
              <svg
                className="w-5 h-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 11h8.533c.044.385.067.78.067 1.184 0 2.734-.98 5.036-2.678 6.6-1.485 1.371-3.518 2.175-5.942 2.175A8.976 8.976 0 0 1 3 11.98 8.976 8.976 0 0 1 11.98 3c2.42 0 4.453.89 6.008 2.339L16.526 6.8C15.368 5.681 13.803 5 12 5a7 7 0 1 0 0 14c3.526 0 6.144-2.608 6.577-6H12v-2z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default loginForm
