import Image from 'next/image'
import React from 'react'

const DailyForecast = () => {
  return (
    <div className='flex flex-col bg-neutral-800 p-4 h-[130px] rounded-2xl flex-[1_1_14]  justify-between items-center border border-neutral-600'>
        <p className='text-neutral-0 font-semibold'>
            Mon
        </p>
        <Image src="/icon-sunny.webp" alt="sunny" width={40} height={40} />
        <div className='flex justify-between w-full'>
            <p>20&#176;</p>
            <p>14&#176;</p>
        </div>
    </div>
  )
}

export default DailyForecast