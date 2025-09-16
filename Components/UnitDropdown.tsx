import React from "react";
type UnitDropdownProps ={
  imperial: boolean;
  setImperial: (val: boolean) => void;
}
const UnitDropdown = ({imperial, setImperial}:UnitDropdownProps) => {
  const handleImperial = () => {
    setImperial(!imperial);
  }
  return (
    <div className="absolute rounded-lg p-3 flex-col gap-1 z-1 text-md  -bottom-77 flex text-left right-0 w-50 border border-neutral-600 bg-neutral-700">
      <p onClick={handleImperial}>{`Switch to ${imperial?'metric':'imperial'}`}</p>
      <p className="text-neutral-400 text-sm">Temperature</p>
      <p>Celcius(&#176;C)</p>
      <p>Farenheit(&#176;F)</p>
      <div className="w-full border-[0.1px] border-neutral-600" />
      <p className="text-neutral-400 text-sm">Wind speed</p>
      <p>km/h</p>
      <p>mph</p>
      <div className="w-full border-[0.1px] border-neutral-600" />
      <p className="text-neutral-400 text-sm">Precipitation</p>
      <p>Millimeters(mm)</p>
      <p>Inches(In)</p>
    </div>
  );
};

export default UnitDropdown;
