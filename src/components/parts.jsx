import { use, useEffect, useState, useRef } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";

export const MyIcon = ({ icon, cls }) => {
  return (
    <img
      src={`/assets/images/icon-${icon}.svg`}
      alt={icon}
      className={cls ? cls : ""}
    />
  );
};

export const ButtonWithIcon = ({
  id,
  cls,
  action,
  text,
  alt1 = "",
  alt2 = "",
}) => {
  return (
    <button
      id={id ? id : ""}
      onClick={action}
      type="button"
      className="text-white bg-neutral-700 cursor-pointer focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center gap-1.5 "
    >
      {alt1 && <MyIcon cls={cls} icon={alt1} />}
      {text}
      {alt2 && <MyIcon cls={cls} icon={alt2} />}
    </button>
  );
};

export const UnitsDropdown = ({ ref }) => {
  const [wispUnit, setWispUnit] = useState("");
  const [tempUnit, setTempUnit] = useState("");
  const [precUnit, setPrecUnit] = useState("");
  const [unitForm, setUnitForm] = useState("METRIC");
  const { setApiUrl, location } = use(WeatherInfoContext);

  useEffect(() => {
    const setUrl = () => {
      const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=auto`;
      const wispStr = wispUnit ? `&wind_speed_unit=${wispUnit}` : "";
      const tempStr = tempUnit ? `&temperature_unit=${tempUnit}` : "";
      const precStr = precUnit ? `&precipitation_unit=${precUnit}` : "";
      const newUrl = baseUrl + wispStr + tempStr + precStr;

      if (!wispUnit && !tempUnit && !precUnit) setUnitForm("METRIC");
      else if (wispUnit && tempUnit && precUnit) setUnitForm("IMPERIAL");
      else setUnitForm("")
      
      setApiUrl(newUrl);
    };
    setUrl();
  }, [wispUnit, precUnit, tempUnit]);

  const handleUnitSwitch = (e) => {
    if (e.target.value === "METRIC") {
      setPrecUnit("");
      setTempUnit("");
      setWispUnit("");
    } else if (e.target.value === "IMPERIAL") {
      setPrecUnit("inch");
      setTempUnit("fahrenheit");
      setWispUnit("mph");
    }
  };

  const SwitchButton = ({ title, unitForm }) => {
    return (
      <button
        onClick={handleUnitSwitch}
        value={title}
        className={`switch font-bold p-1.5 text-[12px] ${
          unitForm === title ? "bg-blue-500" : "bg-neutral-700"
        }  hover:bg-neutral-600 cursor-pointer rounded-sm`}
      >
        {title}
      </button>
    );
  };

  const UnitSection = ({ title, cls, children }) => {
    return (
      <div className={cls ? cls : ""}>
        <h4 className="text-sm text-neutral-300">{title} </h4>
        {children}
      </div>
    );
  };

  const Unit = ({ text, value, func, recvd }) => {
    return (
      <button
        type="button"
        onClick={() => func(value)}
        className={`flex w-full items-center justify-between cursor-pointer py-1 px-2 rounded-md hover:bg-neutral-700 ${
          recvd === value ? "bg-neutral-700 rounded-sm" : ""
        }`}
      >
        <span className="text-neutral-0 text-sm">{text}</span>
        <img
          src={`/assets/images/icon-checkmark.svg`}
          alt="checkmark icon"
          className={recvd === value ? "" : "hidden"}
        />
      </button>
    );
  };

  return (
    <div
      ref={ref}
      className="z-10 space-y-3 bg-neutral-800 mt-2 ring ring-neutral-600 p-2 rounded-md shadow-sm w-46 absolute right-0 "
    >
      <div className="grid grid-cols-2 gap-2 ">
        <SwitchButton title="IMPERIAL" unitForm={unitForm} />
        <SwitchButton title="METRIC" unitForm={unitForm} />
      </div>
      <UnitSection title="Temperature" cls="pb-2 border-b border-b-neutral-600">
        <Unit
          value=""
          func={setTempUnit}
          recvd={tempUnit}
          text="Celcius (&deg;C)"
        />

        <Unit
          value="fahrenheit"
          func={setTempUnit}
          recvd={tempUnit}
          text="Fahrenheit (&deg;F)"
        />
      </UnitSection>
      <UnitSection title="Wind speed" cls="pb-2 border-b border-b-neutral-600">
        <Unit value="" func={setWispUnit} recvd={wispUnit} text="km/h" />
        <Unit value="mph" func={setWispUnit} recvd={wispUnit} text="mph" />
      </UnitSection>
      <UnitSection title="Precipitation">
        <Unit
          value=""
          func={setPrecUnit}
          recvd={precUnit}
          text="Millimeters (mm)"
        />
        <Unit
          value="inch"
          func={setPrecUnit}
          recvd={precUnit}
          text="Inches (in)"
        />
      </UnitSection>
    </div>
  );
};

export const ErrorComponenet = () => {
  return (
    <main className="w-[600px] flex flex-col gap-4 items-center relative mt-9">
      <MyIcon icon="error" cls="w-[35px]" />
      <h1 className="text-4xl">Something went wrong</h1>
      <p className="">
        We couldn't connect to the server (API error). Please try again later.
      </p>
      <ButtonWithIcon action={() => {}} text="retry" alt1="retry" />
    </main>
  );
};
