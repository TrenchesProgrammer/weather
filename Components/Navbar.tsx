"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import UnitDropdown from "./UnitDropdown";
type NavbarProps ={
  imperial: boolean;
  setImperial: (val: boolean) => void;
  mph: boolean;
  setMph: (val: boolean) => void;
  inch: boolean;
  setInch: (val: boolean) => void;
  farenheit: boolean;
  setFarenheit: (val: boolean) => void;
}
const Navbar = ({imperial, setImperial, mph, setMph, inch, setInch, farenheit, setFarenheit}:NavbarProps) => {
  const [unitsDropdown, setUnitsDropdown] = useState(false); // visible or not
  const [locked, setLocked] = useState(false);               // locked by click
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <nav>
      <div className="flex lg:px-20 px-5 py-5 justify-between items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={150} />

        {/* Wrapper around both button + dropdown */}
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
            className="flex gap-2 bg-neutral-800 cursor-pointer hover:bg-neutral-700 rounded-lg p-2.5 items-center"
          >
            <Image src="/icon-units.svg" alt="units" width={16} height={16} />
            <p>Units</p>
            <Image
              src="/icon-dropdown.svg"
              alt="dropdown"
              width={16}
              height={16}
              className={`transition-transform duration-200 ${
                unitsDropdown ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {unitsDropdown && (
            <UnitDropdown imperial={imperial} farenheit={farenheit} setFarenheit={setFarenheit} setImperial={setImperial} mph={mph} setMph={setMph} inch={inch} setInch={setInch} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
