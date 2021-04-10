import clsx from 'clsx'
import { Dispatch, ReactNode, SetStateAction } from 'react'

const modal = ({
  isOpen,
  setOpen,
  children,
}: {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}) => {
  const toggleMenu = () => setOpen(p => !p)

  return (
    <>
      <button
        onClick={toggleMenu}
        className={clsx(
          'fixed inset-0 z-40 w-screen h-screen transition bg-black ',
          isOpen ? 'bg-opacity-50' : 'hidden bg-opacity-0'
        )}
      />
      <div
        className={clsx(
          'fixed z-50 transition transform h-64 flex items-center top-20 left-1/2 -translate-x-1/2'
        )}
        style={{
          transform: `translate(-50%,${isOpen ? 0 : '-100vh'})`,
        }}
      >
        {children}
      </div>
    </>
  )
}

export default modal
