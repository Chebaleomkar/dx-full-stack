import Loader from '@/components/Loader'
import React from 'react'

const loading = () => {
  return (
    <div className='flex items-center justify-center dark:text-white '  >
        <Loader />
    </div>
  )
}

export default loading;
