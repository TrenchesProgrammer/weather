import React from 'react'
import SearchItem from './SearchItem';
interface SearchDropdownProps {
  searchData: Array<{ name: string; country: string; state?: string; lat?: number; lon?: number }>;
  setsearchLat?: (lat: number) => void;
  setsearchLon?: (lon: number) => void;
  setInput?: (input: string) => void;
}
const SearchDropdown = ({searchData, setInput, setsearchLon, setsearchLat}:SearchDropdownProps) => {
  return (
    <div className='bg-neutral-800 mt-2 border border-neutral-700 p-2 w-full absolute rounded-lg'>
         {searchData
           .filter(item => typeof item.lat === 'number' && typeof item.lon === 'number')
           .map((item, index) => (
            <SearchItem
              name={item.name}
              key={index}
              setsearchLat={setsearchLat}
              setsearchLon={setsearchLon}
              lat={item.lat as number}
              lon={item.lon as number}
              setInput={setInput}
              country={item.country}
            />
         ))}
    </div>
  )
}

export default SearchDropdown