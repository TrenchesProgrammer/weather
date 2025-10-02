"use client";
import DailyForecast from "@/Components/DailyForecast";
import DayDropdown from "@/Components/DayDropdown";
import HourlyForecast from "@/Components/HourlyForecast";
import Instruments from "@/Components/Instruments";
import Navbar from "@/Components/Navbar";
import SearchDropdown from "@/Components/SearchDropdown";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export default function Home() {
  const [searchlat, setSearchLat] = useState(0);
  const [searchlon, setSearchLon] = useState(0);
  const [unitsDropdown, setUnitsDropdown] = useState(false); // visible or not
  const [locked, setLocked] = useState(false); // locked by click
  const [state, setState] = useState("Unknown location");
  const [country, setCountry] = useState("");
  const [input, setInput] = useState("");
  const handleInput = (value: string) => {
    setInput(value);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const date = new Date();
  const [imperial, setImperial] = useState(false);
  type WeatherData = {
    current: {
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      wind_speed_10m: number;
      precipitation: number;
      weathercode: number;
    };
    daily: {
      time: string[];
      temperature_2m_min: number[];
      temperature_2m_max: number[];
      weathercode: number[];
    };
    hourly: {
      time: string[];
      temperature_2m: string[];
      weathercode: string[];
    };
  };
  type City = {
    name: string;
    country: string;
    state?: string;
    lat: number;
    lon: number;
  };
  const [farenheit, setFarenheit] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);
  const [imperialData, setImperialData] = useState<WeatherData | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [mph, setMph] = useState(false);
  const [inch, setInch] = useState(false);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const today = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date.getHours();
  const [selectedDay, setSelectedDay] = useState(today);
  const [temperatureMin, setTemperatureMin] = useState<number[]>([]);
  const [temperatureMax, setTemperatureMax] = useState<number[]>([]);
  const [currentTemp, setCurrentTemp] = useState("--");
  const [apparentTemp, setApparentTemp] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [wind, setWind] = useState("--");
  const [precipitation, setPrecipitation] = useState("--");
  const [weatherCode, setWeatherCode] = useState(0);
  const [windUnit, setWindUnit] = useState("km/h");
  const [precipitationUnit, setPrecipitationUnit] = useState("mm");
  const [dailyWeatherCode, setDailyWeatherCode] = useState<number[]>([]);

  useEffect(() => {
    setMph(imperial);
    setInch(imperial);
  }, [imperial]);
  const [hourly, setHourly] = useState<{
    time: string[];
    temperature_2m: string[];
    weathercode: string[];
  }>({ temperature_2m: [], time: [], weathercode: [] });

  const [searchData, setSearchData] = useState<city[]>([]);

  useEffect(() => {
    if (input.length > 2) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=20&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchData(data);
        });
    } else {
      setSearchData([]);
    }
  }, [input]);
  useEffect(() => {
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
    async function getWeather() {
      const getPosition = () =>
        new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      try {
        const position = await getPosition();

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const cityRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${
            searchlat ? searchlat : latitude
          }&lon=${searchlon ? searchlon : longitude}&limit=1&appid=${
            process.env.NEXT_PUBLIC_API_KEY
          }`
        );
        const cityData = await cityRes.json();
        setState(cityData[0]?.state ?? "Unknown location");
        setCountry(cityData[0]?.country ?? "");
        // 2. Get weather using Open-Meteo
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${
          searchlat ? searchlat : latitude
        }&longitude=${
          searchlon ? searchlon : longitude
        }&current=temperature_2m,relative_humidity_2m,precipitation,weathercode,wind_speed_10m,apparent_temperature${
          farenheit ? "&temperature_unit=fahrenheit" : ""
        }&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min`;
        const imperialUrl = `https://api.open-meteo.com/v1/forecast?latitude=${
          searchlat ? searchlat : latitude
        }&longitude=${
          searchlon ? searchlon : longitude
        }&current=temperature_2m,relative_humidity_2m,precipitation,weathercode,wind_speed_10m,apparent_temperature${
          farenheit ? "&otemperature_unit=fahrenheit" : ""
        }&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&wind_speed_unit=mph&precipitation_unit=inch`;
        const response = await fetch(url);
        const response2 = await fetch(imperialUrl);
        setData(await response.json());
        setImperialData(await response2.json());
      } catch (error) {
        console.error("Error getting weather:", error);
      }
    }
    getWeather();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [farenheit, searchlat, searchlon]);
  useEffect(() => {
    if (!data || !data.current) return; // <-- Add this guard

    setCurrentTemp(Math.round(Number(data.current.temperature_2m)).toString());
    setApparentTemp(
      Math.round(Number(data.current.apparent_temperature)).toString()
    );
    setHumidity(
      Math.round(Number(data.current.relative_humidity_2m)).toString()
    );
    setWind(
      (mph
        ? imperialData?.current?.wind_speed_10m
        : data.current.wind_speed_10m) !== undefined
        ? Math.round(
            Number(
              mph
                ? imperialData?.current?.wind_speed_10m
                : data.current.wind_speed_10m
            )
          ).toString()
        : "--"
    );
    setPrecipitation(
      inch
        ? imperialData?.current?.precipitation !== undefined
          ? imperialData.current.precipitation.toString()
          : "--"
        : data.current.precipitation !== undefined
        ? data.current.precipitation.toString()
        : "--"
    );
    setWeatherCode(data.current.weathercode ?? 0);
    setWindUnit(mph ? "mph" : "km/h");
    setPrecipitationUnit(inch ? "in" : "mm");
    setDays(data.daily.time ?? []);
    setTemperatureMin(data.daily.temperature_2m_min ?? []);
    setTemperatureMax(data.daily.temperature_2m_max ?? []);
    setDailyWeatherCode(data.daily.weathercode ?? []);
    setHourly(data.hourly ?? { temperature_2m: [], time: [], weathercode: [] });
  }, [data, imperialData, mph, inch]);
  const handleClick = () => {
    if (locked) {
      setLocked(false);
      setUnitsDropdown(false);
    } else {
      setLocked(true);
      setUnitsDropdown(true);
    }
  };
  const daysOfWeek = Object.values(days).map((dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });
  const dayGroups: {
    [key: string]: { time: string; temp: string; weathercode: string }[];
  } = {};
  hourly.time.forEach((timestamp: string, i: number) => {
    const [date, h] = timestamp.split("T");
    const [hourStr] = h.split(":");
    let newHour = parseInt(hourStr, 10);
    const suffix = newHour >= 12 ? "PM" : "AM";

    newHour = newHour % 12 || 12;

    const hour = `${newHour}${suffix}`;
    const dayDate = new Date(date);
    const day = dayDate.toLocaleDateString("en-US", { weekday: "long" });
    if (!dayGroups[day]) {
      dayGroups[day] = [];
    }
    dayGroups[day].push({
      time: hour,
      temp: hourly.temperature_2m[i],
      weathercode: hourly.weathercode[i],
    });
  });

  const convertTo24 = (timeStr: string) => {
    timeStr = timeStr.replace(/\s+/g, "");
    const match = timeStr.match(/(\d+)(am|pm)/i);
    if (!match) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    const [hour, modifier] = match.slice(1);

    let hourdigit = parseInt(hour, 10);

    if (modifier.toLowerCase() === "pm" && hourdigit !== 12) {
      hourdigit += 12;
    }
    if (modifier.toLowerCase() === "am" && hourdigit === 12) {
      hourdigit = 0;
    }

    return hourdigit;
  };

  const filtered = dayGroups[selectedDay]?.filter((obj) => {
    return convertTo24(obj.time) >= time;
  });

  return (
    <>
      <Navbar
        imperial={imperial}
        farenheit={farenheit}
        setFarenheit={setFarenheit}
        mph={mph}
        setMph={setMph}
        inch={inch}
        setInch={setInch}
        setImperial={setImperial}
      />
      <div className="px-10 mt-10">
        <h1
          className={`text-5xl font-bold ${bricolageGrotesque.className} text-center `}
        >
          How&#39;s the sky looking today?
        </h1>
      </div>
      <form className="flex justify-center gap-3 w-full  mt-12 flex-col sm:flex-row px-5 max-w-3xl m-auto">
        <div className=" sm:w-[70%] w-[100%] relative">
          <input
            type="text"
            value={input}
            className="bg-neutral-800 w-[100%] hover:bg-neutral-700 cursor-pointer rounded-xl bg-search  placeholder:text-neutral-200 px-12 p-3 "
            placeholder="Search for a place"
            onChange={(e) => handleInput(e.target.value)}
          />
          {input.length > 2 && (
            <SearchDropdown
              searchData={searchData}
              setsearchLat={setSearchLat}
              setInput={setInput}
              setsearchLon={setSearchLon}
            />
          )}
        </div>

        <input
          type="submit"
          className="bg-[#4658D9] hover:bg-[#2B1B9C] cursor-pointer rounded-xl sm:w-[30%] h-12 w-[100%] p-3"
          value="Search"
        />
      </form>

      <div className="flex px-5 items-stretch justify-between flex-col lg:flex-row lg:px-20 pt-12">
        <div className="lg:w-[60%] flex flex-col justify-between gap-5 w-full ">
          <div className="md:bg-today-large bg-today-small bg-no-repeat bg-cover  h-[300px] lg:h-[250px] w-full flex-col sm:flex-row items-center rounded-3xl flex  justify-between p-10">
            <div className="flex  flex-col text-center sm:text-left">
              <p className="text-3xl font-semibold">{`${state}, ${country}`}</p>
              <p className="text-lg text-neutral-300">{formattedDate}</p>
            </div>
            <div className="flex items-center justify-around w-full sm:w-auto">
              <Image
                src={`/icon-${weatherCode}.webp`}
                alt="weather"
                width={100}
                height={100}
              />
              <p className="text-8xl font-bold">
                {`${currentTemp ? currentTemp : 0}`}&#176;
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5 flex-wrap ">
            <Instruments
              label="Feels Like"
              unit="&#176;"
              value={apparentTemp}
            />
            <Instruments label="Humidity" unit="%" value={humidity} />
            <Instruments label="Wind" unit={windUnit} value={wind} />
            <Instruments
              label="Precipitation"
              unit={precipitationUnit}
              value={precipitation}
            />
          </div>
          <div>
            <p>Daily forecast</p>
            <div className="flex gap-3 flex-wrap  w-full mt-5 pb-5">
              {daysOfWeek.map((day, index) => (
                <DailyForecast
                  day={day}
                  key={index}
                  min={Math.round(Number(temperatureMin[index])).toString()}
                  max={Math.round(Number(temperatureMax[index])).toString()}
                  dailyweatherCode={dailyWeatherCode[index]?.toString()}
                />
              ))}
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
              <button
                onClick={handleClick}
                className="flex gap-2 bg-neutral-600 rounded-lg p-2.5 cursor-pointer relative hover:bg-neutral-700"
              >
                <p>{selectedDay}</p>
                <Image
                  src="/icon-dropdown.svg"
                  alt="dropdown"
                  width={16}
                  height={16}
                />
                {unitsDropdown && (
                  <DayDropdown
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="flex h-[83%] flex-col gap-3 ">
            {/* {selectedDay !== today && dayGroups[selectedDay]?.slice(0,8).map((item, index)=><HourlyForecast key={index} time={item.time} temp={Math.round(Number(item.temp)).toString()} weatherCode={item.weathercode} />)}    */}
            {selectedDay === today
              ? filtered
                  ?.slice(0, 8)
                  ?.map((item, index) => (
                    <HourlyForecast
                      key={index}
                      time={item.time}
                      temp={Math.round(Number(item.temp)).toString()}
                      weatherCode={item.weathercode}
                    />
                  ))
              : dayGroups[selectedDay]
                  ?.slice(0, 8)
                  .map((item, index) => (
                    <HourlyForecast
                      key={index}
                      time={item.time}
                      temp={Math.round(Number(item.temp)).toString()}
                      weatherCode={item.weathercode}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
}
