import Image from 'next/image'
import React from 'react'

const LoadingPage = () => {
  return (
    <div
      className={
        "w-full min-h-screen mx-auto p-2 bg-gray-50 flex flex-col justify-center items-center"
      }
    >
      <Image
        src={
          '/assets/images/login-logo.png'
        }
        width={250}
        height={250}
        alt="logo"
      />
      <div className="relative rounded-lg bg-gray-400 w-48 h-[2px] overflow-hidden">
        <div className='w-1/3 h-full absolute bg-blue-600 rounded-lg top-0 left-0 animate-move'></div>
      </div>
    </div>
  )
}

export default LoadingPage