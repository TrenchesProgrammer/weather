import React from 'react'
type InstrumentProps ={
    label: string;
    unit: string;
    value?: string;
}
const Instruments = ({label, unit, value}:InstrumentProps) => {
  return (
    <div className='flex flex-col bg-neutral-800 p-5 flex-[1_1_24] h-[110px] rounded-2xl justify-between border border-neutral-600'>
        <p className='text-neutral-400 font-semibold whitespace-nowrap'>
            {label}
        </p>
        <p className='text-2xl '>
          {`${value}${unit}`}
        </p>
    </div>
  )
}

export default Instruments