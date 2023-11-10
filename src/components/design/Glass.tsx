import React from 'react'

export const Glass: React.FC = () => {
  return (
    <>
      <span className='fixed blur-[200px] lg:w-[600px] w-[400px] lg:h-[600px] h-[400px] rounded-full top-[10%] md:start-[10%] -start-[20%] -z-1 bg-primary-600/20 dark:bg-primary-600/10' />
      <span className='fixed blur-[200px] lg:w-[600px] w-[400px] lg:h-[600px] h-[400px] rounded-full bottom-[10%] md:end-[10%] -end-[20%] -z-1 bg-secondary-600/20 dark:bg-secondary-600/10' />
    </>
  )
}

export default Glass
