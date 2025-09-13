import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="flex lg:px-20 px-5 py-5 justify-between align-baseline">
        <Image src="/logo.svg" alt="logo" width={150} height={150} />
        <button className="flex gap-2 bg-neutral-800 rounded-lg p-2.5">
          <Image src="/icon-units.svg" alt="units" width={16} height={16} />
          <p>Units</p>
          <Image
            src="/icon-dropdown.svg"
            alt="dropdown"
            width={16}
            height={16}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
