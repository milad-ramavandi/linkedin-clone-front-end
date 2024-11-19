'use client'
import React from 'react'

const OverleyEffect = () => {
  return (
    <div className={'hidden sm:block'}>
      <div className={'fixed w-[100vw] min-h-screen top-0 left-0 bottom-0 right-0 bg-gray-700 bg-opacity-85 z-30'}></div>
    </div>
  )
}

export default OverleyEffect