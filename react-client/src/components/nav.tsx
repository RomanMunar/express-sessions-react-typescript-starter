import clsx from 'clsx'
import { useState } from 'react'
import { IUser, logout } from '../authFetchers'

const nav = ({
  onResendEmailVerification,
  onForgotPassword,
  user,
  onLogout,
}: {
  user?: IUser
  onResendEmailVerification: () => void
  onForgotPassword: (email: string) => void
  onLogout: () => Promise<void>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(p => !p)
  const onForgotPasswordClick = () => {
    if (!user) return

    onForgotPassword(user.email)
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-3 bg-gray-800">
      <button
        onClick={toggleMenu}
        className={clsx(
          'fixed inset-0 z-40 w-screen h-screen transition bg-black ',
          isOpen ? 'bg-opacity-70' : 'hidden bg-opacity-0'
        )}
      />
      <div className="relative">
        <h1 className="text-lg font-bold">Node Starter</h1>
        <div className="absolute top-0 w-6 h-6 bg-yellow-400 rounded-full -right-7 animate-bounce"></div>
      </div>
      <button
        onClick={toggleMenu}
        className="fixed z-50 rounded-full top-4 right-5 focus:ring-2 focus:outline-none ring-yellow-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          )}
        </svg>
      </button>
      <aside
        style={{ width: '300px' }}
        className={clsx(
          'fixed top-0 right-0 z-40 h-screen transition-transform bg-gray-700 transform',
          [isOpen ? 'translate-x-0' : 'translate-x-80']
        )}
      >
        <h2 className="my-4 text-xl font-bold text-center">Starter Account</h2>
        <ul className="border-t border-b divide-y ">
          {user ? (
            <>
              <li className="p-2">
                <button onClick={onResendEmailVerification}>
                  Resend Email Verification
                </button>
              </li>
              <li className="p-2">
                <button onClick={onForgotPasswordClick}>Reset Password</button>
              </li>
              <li className="p-2">
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <p className="text-xl font-bold text-center">Log in first</p>
          )}
        </ul>
      </aside>
    </nav>
  )
}

export default nav
