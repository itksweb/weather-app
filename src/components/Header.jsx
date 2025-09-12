import { useState } from "react";

const Header = ({openUnits, setOpenUnits, theme, switchTheme }) => {
  

  return (
    <header className={`w-full flex justify-between items-start`}>
      <img src={`/assets/images/logo.svg`} alt="weather app logo" />
      <button
        onClick={() => setOpenUnits(!openUnits)}
        className="text-white bg-neutral-800 hover:bg-neutral-700  focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center "
        type="button"
      >
        <img src="/assets/images/icon-units.svg" alt="units" className="" />
        Units
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
