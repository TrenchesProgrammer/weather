import Image from 'next/image'
import React from 'react'

const HourlyForecast = () => {
  return (
    <div className='bg-neutral-700 rounded-lg h-[11%] border border-neutral-600 flex items-center justify-between px-3'>
        <div className='flex justify-between items-center gap-3'>
            <Image
                src="/icon-sunny.webp"
                alt="sunny"
                width={50}
                height={50}
            />
            <p className='whitespace-nowrap'>1 PM</p>
        </div>
        <p>19&#176;</p>
    </div>
  )
}

export default HourlyForecast