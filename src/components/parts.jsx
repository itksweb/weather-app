import { getHourlyFromSelectedDay } from "../utils";
import { use, useEffect, useRef } from "react";
import { WeatherInfoContext } from "../store/weatherInfoContext";

const baseUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.419998&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto";

export const UnitsDropdown = ({}) => {
  const dropdownRef = useRef(null);
  const {
    setPrecUnit,
    setWispUnit,
    setTempUnit,
    precUnit,
    wispUnit,
    tempUnit,
    setApiUrl,
    setOpenUnits,
  } = use(WeatherInfoContext);

  useEffect(() => {
    const setUrl = () => {
      if (!wispUnit && !tempUnit && precUnit) {
        setApiUrl(baseUrl);
        return;
      }
      const wispStr = wispUnit ? `&wind_speed_unit=${wispUnit}` : "";
      const tempStr = tempUnit ? `&temperature_unit=${tempUnit}` : "";
      const precStr = precUnit ? `&precipitation_unit=${precUnit}` : "";
      const newUrl = baseUrl + wispStr + tempStr + precStr;
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

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpenUnits(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const SwitchButton = ({ title }) => {
    return (
      <button
        onClick={handleUnitSwitch}
        value={title}
        className="switch font-bold p-1.5 text-[12px] bg-neutral-700 hover:bg-neutral-600 rounded-sm"
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
      ref={dropdownRef}
      className="z-10 space-y-3 bg-neutral-800 mt-2 ring ring-neutral-600 p-2 rounded-md shadow-sm w-46 absolute right-0 "
    >
      <div className="grid grid-cols-2 gap-2 ">
        <SwitchButton title="IMPERIAL" />
        <SwitchButton title="METRIC" />
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

export const WeatherMain = () => {
  const { current } = use(WeatherInfoContext);
  return (
    <div className="weather-main rounded-lg flex items-center justify-between p-5 bg-neutral-700 min-h-[210px] bg-[url(/assets/images/bg-today-large.svg)] max-sm:bg-[url(/assets/images/bg-today-small.svg)] bg-cover">
      <div className="lef">
        <p className="place">Warri</p>
        <p className="date">{current.date}</p>
      </div>
      <div className="rig flex items-center justify-end">
        <img
          src="/assets/images/icon-sunny.webp"
          alt="sunny"
          className="size-[80px]"
        />
        <span className="text-5xl">{current.temperature}&deg;</span>
      </div>
    </div>
  );
};

export const WeatherMore = () => {
  const { current } = use(WeatherInfoContext);
  return (
    <div className="grid grid-cols-4 gap-3">
      {current.det.map((item) => {
        return (
          <div
            key={item[0]}
            className="min-h-[70px] p-3 bg-neutral-800 ring ring-neutral-600 col-span-1 rounded-md "
          >
            <p className="text-sm font-light">{item[0]}</p>
            <p className="text-lg mt-3">{item[1]}</p>
          </div>
        );
      })}
    </div>
  );
};

export const DailyForcast = () => {
  const { weekData } = use(WeatherInfoContext);

  return (
    <div className="">
      <h4 className="text-xl mb-2">Daily forecast</h4>
      <div className="grid grid-cols-7 gap-3">
        {weekData.map((item) => {
          return (
            <div
              key={item[0]}
              className="min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md"
            >
              <p className="">{item[0].slice(0, 3)}</p>
              <img
                src="/assets/images/icon-drizzle.webp"
                alt="drizzle"
                className=""
              />
              <div className="flex items-end justify-between text-[14px]">
                <span className="le">{item[1]}&deg;</span>
                <span className="ri">{item[2]}&deg;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MyIcon = ({ icon, cls }) => {
  return (
    <img
      src={`/assets/images/icon-${icon}.svg`}
      alt={icon}
      className={cls ? cls : ""}
    />
  );
};

export const ButtonWithIcon = ({ action, text, alt1 = "", alt2 = "" }) => {
  return (
    <button
      onClick={action}
      type="button"
      className="text-white bg-neutral-700 cursor-pointer focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center gap-1.5 "
    >
      {alt1 && <MyIcon icon={alt1} />}
      {text}
      {alt2 && <MyIcon icon={alt2} />}
    </button>
  );
};

const SidebarHead = () => {
  const { setOpenDays, selectedDay } = use(WeatherInfoContext);
  return (
    <div className="flex items-center justify-between">
      <p className="hourly">Hourly forecast</p>
      <ButtonWithIcon
        action={() => setOpenDays((prev) => !prev)}
        text={selectedDay}
        alt2="dropdown"
      />
    </div>
  );
};

const DaysDropdown = () => {
  const daysDropdownRef = useRef(null);
  const { setSelectedDay, setOpenDays, weekData, setHourlyData } =
    use(WeatherInfoContext);

  const handleClick = (day, index) => {
    setSelectedDay(day);
    setHourlyData(getHourlyFromSelectedDay(index));
    setOpenDays(false);
  };

  const handleClickOutside = (e) => {
    if (
      daysDropdownRef.current &&
      !daysDropdownRef.current.contains(e.target)
    ) {
      setOpenDays(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [daysDropdownRef]);

  return (
    <div
      ref={daysDropdownRef}
      className="z-10 grid gap-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-40 absolute right-0 "
    >
      {weekData.map((it, index) => (
        <button
          onClick={() => handleClick(it[0], index)}
          key={it[0]}
          className="text-sm w-full rounded-md p-2 hover:bg-neutral-700 text-neutral-200"
        >
          {it[0]}
        </button>
      ))}
    </div>
  );
};

const HourlyUnit = ({ item }) => {
  const { isLoading } = use(WeatherInfoContext);
  if (isLoading) {
    return (
      <div className=" p-5 w-full bg-neutral-700 ring ring-neutral-600 rounded-md"></div>
    );
  }
  return (
    <div className=" p-2 w-full bg-neutral-700 ring ring-neutral-600 flex items-center justify-between rounded-md">
      <div className="flex items-center justify-start">
        <img
          src="/assets/images/icon-drizzle.webp"
          alt="drizzle"
          className="size-7"
        />
        <span className="le">{item[0]}</span>
      </div>
      <span className="ri">{item[1]}&deg;</span>
    </div>
  );
};

export const WeatherSidebar = () => {
  const {
    setOpenDays,
    selectedDay,
    openDays,
    setSelectedDay,
    weekData,
    hourlyData,
  } = use(WeatherInfoContext);
  return (
    <div className="vert-scroll sidebar col-span-7 relative overflow-y-scroll h-[550px] bg-neutral-800 p-6 rounded-lg flex flex-col justify-start gap-2 ">
      <SidebarHead
        setOpenDays={setOpenDays}
        selectedDay={selectedDay}
        openDays={openDays}
      />
      {openDays && (
        <DaysDropdown
          setSelectedDay={setSelectedDay}
          setOpenDays={setOpenDays}
          weekData={weekData}
        />
      )}
      <>
        {hourlyData.map((item) => (
          <HourlyUnit key={item[0]} item={item} />
        ))}
      </>
    </div>
  );
};

export const SearchBar = () => {
  return (
    <div className="search_component flex flex-col items-center w-1/2">
      <form className="flex items-center w-full">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a place..."
            required
            className="bg-neutral-800 hover:bg-neutral-700 focus:border text-neutral-200 text-sm rounded-lg focus:ring-neutral-200 focus:border-neutral-200 block w-full ps-10 p-2.5  "
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-neutral-0 bg-blue-500 rounded-lg  hover:bg-blue-700 focus:border focus:ring-blue-500 focus:border-blue-500 "
        >
          Search
        </button>
      </form>
      <div className="search_auto_res"></div>
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
