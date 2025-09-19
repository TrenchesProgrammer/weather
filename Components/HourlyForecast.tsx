import Image from 'next/image'
import React from 'react'

type HourlyProps = {
  time: string;
  temp: string;
  weatherCode: string;
}

const HourlyForecast = ({time, temp, weatherCode}:HourlyProps) => {
  return (
    <div className='bg-neutral-700 rounded-lg h-[11%] border border-neutral-600 flex items-center justify-between px-3'>
        <div className='flex justify-between items-center gap-3'>
            <Image
                src={`/icon-${weatherCode}.webp`}
                alt="weather"
                width={50}
                height={50}
            />
            <p className='whitespace-nowrap'>{time}</p>
        </div>
        <p>{temp}&#176;</p>
    </div>
  )
}

export default HourlyForecast