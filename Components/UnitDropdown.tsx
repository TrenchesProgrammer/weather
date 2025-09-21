import React from "react";
type UnitDropdownProps ={
  imperial: boolean;
  setImperial: (val: boolean) => void;
    mph: boolean;
  setMph: (val: boolean) => void;
  inch: boolean;
  setInch: (val: boolean) => void;
  farenheit: boolean;
  setFarenheit: (val: boolean) => void;
}
const UnitDropdown = ({imperial, setImperial,  mph, setMph, inch, setInch, farenheit, setFarenheit}:UnitDropdownProps) => {
  const handleImperial = () => {
    setImperial(!imperial);
  }
  return (
    <div className="absolute rounded-lg p-3 flex-col gap-1 z-1 text-md  -bottom-87 flex text-left right-0 w-50 border border-neutral-700 bg-neutral-800">
      <p className={`cursor-pointer bg-neutral-700 p-1 rounded-md`} onClick={handleImperial}>{`Switch to ${imperial?'metric':'imperial'}`}</p>
      <p className="text-neutral-400 text-sm">Temperature</p>
      <p className={`cursor-pointer ${!farenheit?"bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setFarenheit(false)}} >Celcius(&#176;C)</p>
      <p className={`cursor-pointer ${farenheit?"bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setFarenheit(true)}}>Farenheit(&#176;F)</p>
      <div className="w-full border-[0.1px] border-neutral-700" />
      <p className="text-neutral-400 text-sm">Wind speed</p>
      <p className={`cursor-pointer ${!mph?"bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setMph(false)}}>km/h</p>
      <p className={`cursor-pointer ${mph?"bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setMph(true)}}>mph</p>
      <div className="w-full border-[0.1px] border-neutral-700" />
      <p className="text-neutral-400 text-sm ">Precipitation</p>
      <p className={`cursor-pointer ${!inch ? "bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setInch(false)}}>Millimeters(mm)</p>
      <p className={`cursor-pointer ${inch ? "bg-neutral-700":""} hover:bg-neutral-700 p-1 rounded-md`} onClick={()=>{setInch(true)}}>Inches(In)</p>
    </div>
  );
};

export default UnitDropdown;
