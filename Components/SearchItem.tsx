import React from 'react'
type SearchItemProps = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  setInput?: (input: string) => void;
  setsearchLat?: (lat: number) => void;
  setsearchLon?: (lon: number) => void;
}
const SearchItem = ({name, country, lat, lon, setsearchLat, setsearchLon, setInput}:SearchItemProps) => {
    const handleClick = () => {
        if (setsearchLat) setsearchLat(lat);
        if (setsearchLon) setsearchLon(lon);
        if (setInput) setInput("");
    }
  return (
    <div onClick={handleClick} className='px-3 py-2 hover:border border-neutral-600  cursor-pointer rounded-lg hover:bg-neutral-700'>
        <p>{`${name}, ${country}`}</p>
    </div>
  )
}

export default SearchItem