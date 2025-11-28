import { use } from "react";
import { WeatherInfoContext } from "../store/weatherInfoContext";
import { UnitsDropdown, ButtonWithIcon } from "./parts";



const Header = () => {
  const { openUnits, setOpenUnits } = use(WeatherInfoContext);
  return (
    <header className={`w-full relative`}>
      <div className="w-full flex justify-between items-start">
        <img src={`/assets/images/logo.svg`} alt="weather app logo" />
        <ButtonWithIcon
          text="Units"
          action={() => setOpenUnits((prev) => !prev)}
          alt1="units"
          alt2="dropdown"
        />
      </div>
      {openUnits ? <UnitsDropdown /> : <></>}
    </header>
  );
};

export default Header;
