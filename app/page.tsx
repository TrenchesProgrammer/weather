"use client";
import DailyForecast from "@/Components/DailyForecast";
import DayDropdown from "@/Components/DayDropdown";
import HourlyForecast from "@/Components/HourlyForecast";
import Instruments from "@/Components/Instruments";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export default function Home() {
  const [unitsDropdown, setUnitsDropdown] = useState(false); // visible or not
  const [locked, setLocked] = useState(false); // locked by click
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    });
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUnitsDropdown(false);
        setLocked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleClick = () => {
    if (locked) {
      setLocked(false);
      setUnitsDropdown(false);
    } else {
      setLocked(true);
      setUnitsDropdown(true);
    }
  };

  return (
    <>
      <div className="px-10 mt-10">
        <h1
          className={`text-5xl font-bold ${bricolageGrotesque.className} text-center `}
        >
          How&#39;s the sky looking today?
        </h1>
      </div>
      <form className="flex justify-center gap-3 w-full  mt-12 flex-col sm:flex-row px-5 max-w-3xl m-auto">
        <input
          type="text"
          className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-xl sm:w-[70%] w-[100%] bg-search  placeholder:text-neutral-200 px-12 p-3 "
          placeholder="Search for a place"
        />
        <input
          type="submit"
          className="bg-[#4658D9] hover:bg-[#2B1B9C] cursor-pointer rounded-xl sm:w-[30%] w-[100%] p-3"
          value="Search"
        />
      </form>

      <div className="flex px-5 items-stretch justify-between flex-col lg:flex-row lg:px-20 pt-12">
        <div className="lg:w-[60%] flex flex-col justify-between gap-5 w-full ">
          <div className="md:bg-today-large bg-today-small bg-no-repeat bg-cover  h-[300px] lg:h-[250px] w-full flex-col sm:flex-row items-center rounded-3xl flex  justify-between p-10">
            <div className="flex  flex-col text-center sm:text-left">
              <p className="text-3xl font-semibold">Berlin, Germany</p>
              <p className="text-lg text-neutral-300">Monday, 20th Aug</p>
            </div>
            <div className="flex items-center justify-around w-full sm:w-auto">
              <Image
                src="/icon-sunny.webp"
                alt="sunny"
                width={100}
                height={100}
              />
              <p className="text-8xl font-bold">19&#176;</p>
            </div>
          </div>
          <div className="flex justify-between gap-5 flex-wrap ">
            <Instruments />
            <Instruments />
            <Instruments />
            <Instruments />
          </div>
          <div>
            <p>Daily forecast</p>
            <div className="flex gap-3 flex-wrap  w-full mt-5 pb-5">
              <DailyForecast />
              <DailyForecast />
              <DailyForecast />
              <DailyForecast />
              <DailyForecast />
              <DailyForecast />
              <DailyForecast />
            </div>
          </div>
        </div>
        <div className=" bg-neutral-800 lg:w-[35%] w-[100%] rounded-3xl px-6 py-6 mb-5">
          <div className="flex py-4 justify-between items-baseline w-full">
            <p>Hourly Forecast</p>
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => {
                if (!locked) setUnitsDropdown(true);
              }}
              onMouseLeave={() => {
                if (!locked) setUnitsDropdown(false);
              }}

            >
              <button onClick={handleClick} className="flex gap-2 bg-neutral-600 rounded-lg p-2.5 cursor-pointer relative hover:bg-neutral-700">
                <p>Tuesday</p>
                <Image
                  src="/icon-dropdown.svg"
                  alt="dropdown"
                  width={16}
                  height={16}
                />
                { unitsDropdown && <DayDropdown />}
              </button>
            </div>
          </div>
          <div className="flex h-[83%] flex-col lg:justify-between gap-3 ">
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
            <HourlyForecast />
          </div>
        </div>
      </div>
    </>
  );
}
