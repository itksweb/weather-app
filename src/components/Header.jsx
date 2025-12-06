import { use, useEffect, useRef, useState } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { UnitsDropdown, ButtonWithIcon } from "./parts";



const Header = () => {
  const [openUnits, setOpenUnits] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    const notBtn = e.target.id !== "dont" && e.target.className !== "inBtn";
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      notBtn
    ) {
      setOpenUnits(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className={`w-full relative`}>
      <div className="w-full flex justify-between items-start">
        <img src={`/assets/images/logo.svg`} alt="weather app logo" />
        <ButtonWithIcon
          text="Units"
          action={() => setOpenUnits(!openUnits)}
          alt1="units"
          alt2="dropdown"
          id="dont"
          cls="inBtn"
        />
      </div>
      {openUnits ? <UnitsDropdown ref={dropdownRef}  /> : <></>}
    </header>
  );
};

export default Header;
