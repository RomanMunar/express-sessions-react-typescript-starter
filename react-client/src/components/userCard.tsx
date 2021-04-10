import { Dispatch, SetStateAction } from 'react'
import { IUser } from '../authFetchers'

const userCard = ({
  user,
  setResendEmailVerificationForm,
  onLogout,
}: {
  user: IUser
  setResendEmailVerificationForm: Dispatch<SetStateAction<boolean>>
  onLogout: () => void
}) => (
  <div className="flex flex-col items-center max-w-sm p-4 space-y-2 bg-gray-700 rounded shadow text-gray-50">
    <h1 className="text-lg font-bold text-center">{user.name}</h1>
    <img className="w-10 h-10 mx-auto rounded-full" src={user.avatar} alt="Hehe" />
    <div className="flex flex-col m-auto space-y-2">
      <p className="text-md whitespace-nowrap">Email: {user.email}</p>
      <p className="text-md whitespace-nowrap">
        Verified: {!user.verifiedAt ? 'Not verified' : 'Email Verified, Nice!'}
      </p>
      {!user.verifiedAt && (
        <button
          onClick={() => setResendEmailVerificationForm(true)}
          className="px-3 py-1 font-medium transition bg-yellow-600 rounded shadow w-60 text-md focus:bg-yellow-700 hover:bg-yellow-500 active:bg-gray-700"
        >
          Resend Verification Email
        </button>
      )}
      <button
        onClick={onLogout}
        className="px-3 py-1 font-medium transition bg-red-600 rounded shadow w-60 text-md focus:bg-red-700 hover:bg-red-500 active:bg-red-700"
      >
        Logout
      </button>
    </div>
  </div>
)

export default userCard
