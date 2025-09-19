import React from 'react'
type dayDropDownProps ={
  selectedDay: string;
  setSelectedDay: (val: string) => void;
}

const DayDropdown = ({selectedDay, setSelectedDay}:dayDropDownProps) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const handleDayChange = (day:string) => {
    setSelectedDay(day);
    return selectedDay
  }
  return (
    <div className="absolute rounded-lg p-3 flex-col gap-2  text-md  -bottom-76 flex text-left right-0 w-50 border border-neutral-600 bg-neutral-700">
        {days.map((item, index)=>(<p className='hover:bg-neutral-600 p-1 rounded-md' key={index} onClick={() => handleDayChange(item)}>{item}</p>))}
    </div>
  )
}

export default DayDropdown