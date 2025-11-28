import {
  createRandomArrayWithUniqueStrings,
  getHourlyFromSelectedDay,
  notIt,
  baseUrl,
} from "../utils";
import { use, useEffect, useRef, useState } from "react";
import { WeatherInfoContext } from "../store/weatherInfoContext";

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

export const Header = () => {
  const { openUnits, setOpenUnits } = use(WeatherInfoContext);
  useEffect(() => console.log(openUnits), [openUnits]);
  const dropdownRef = useRef(null);
  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      openUnits
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
        <img
          src={`/assets/images/logo.svg`}
          alt="weather app logo"
          className="w-[40%] h-auto "
        />
        <ButtonWithIcon
          text="Units"
          action={() => setOpenUnits(!openUnits)}
          alt1="units"
          alt2="dropdown"
        />
      </div>
      {openUnits && <UnitsDropdown ref={dropdownRef} />}
    </header>
  );
};

export const UnitsDropdown = ({ ref }) => {
  const {
    setPrecUnit,
    setWispUnit,
    setTempUnit,
    precUnit,
    wispUnit,
    tempUnit,
    setApiUrl,
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
      ref={ref}
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
  const { current, isLoading } = use(WeatherInfoContext);
  if (isLoading) {
    return (
      <div className="rounded-lg gap-5 flex items-center justify-center flex-col p-5 bg-neutral-700 min-h-[210px]">
        <MyIcon icon="loading" />
        <p>Loading ...</p>
      </div>
    );
  }
  
  return (
    <div className="weather-main rounded-lg max-xs:flex-col flex items-center justify-between p-5 bg-neutral-700 min-h-[210px] bg-[url(/assets/images/bg-today-large.svg)] max-sm:bg-[url(/assets/images/bg-today-small.svg)] bg-cover">
      <div className="lef flex flex-col items-start max-xs:items-center">
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
  const { current, isLoading } = use(WeatherInfoContext);
  const data = isLoading ? notIt : current.det;

  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3">
      {data.map((item, index) => {
        return (
          <div
            key={isLoading ? item : item[0]}
            key={isLoading ? item : item[0]}
            className="min-h-[70px] p-3 bg-neutral-800 ring ring-neutral-600 col-span-1 rounded-md "
          >
            <p className="text-sm font-light">{notIt[index]}</p>
            <p className="text-lg tt:max-[1030px]:text-base  mt-3">
              {isLoading ? "__" : item[1]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const DailyForcastUnit = ({ item, isLoading }) => {
  if (isLoading) {
    return (
      <div className=" min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 rounded-md"></div>
    );
  }
  return (
    <div className="min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md">
      <p className="">{item[0].slice(0, 3)}</p>
      <img src="/assets/images/icon-drizzle.webp" alt="drizzle" className="" />
      <div className="flex items-end justify-between text-[14px] max-xl:text-[12px] max">
        <span className="le">{item[1]}&deg;</span>
        <span className="ri">{item[2]}&deg;</span>
      </div>
    </div>
  );
};

export const DailyForcast = () => {
  const { weekData, isLoading } = use(WeatherInfoContext);
  const data = isLoading ? createRandomArrayWithUniqueStrings(7) : weekData;

  return (
    <div className="">
      <h4 className="text-xl mb-2">Daily forecast</h4>
      <div className="grid grid-cols-7 xs:max-md:grid-cols-4 ts:max-tb:grid-cols-4 max-xs:grid-cols-3 gap-3">
        {data.map((item) => (
          <DailyForcastUnit
            key={isLoading ? item : item[0]}
            item={item}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
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
    isLoading,
    setSelectedDay,
    weekData,
    hourlyData,
  } = use(WeatherInfoContext);
  const data = isLoading ? createRandomArrayWithUniqueStrings(8) : hourlyData;
  
  return (
    <div className="vert-scroll sidebar min-tb:col-span-3  ts:max-tb:col-span-4 relative overflow-y-scroll h-[550px] bg-neutral-800 p-6 rounded-lg flex flex-col justify-start gap-2 ">
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
        {data.map((item) => (
          <HourlyUnit key={isLoading ? item : item[0]} item={item} />
        {data.map((item) => (
          <HourlyUnit key={isLoading ? item : item[0]} item={item} />
        ))}
      </>
    </div>
  );
};

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const { likelyLocations, setLikelyLocations } = use(WeatherInfoContext);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText.trim().length >= 5) {
      const urll = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchText
      )}&count=5&language=en&format=json`;
      const geolocate = async () => {
        try {
          setSearching(true);
          const response = await fetch(urll);
          if (!response.ok) {
            throw new Error("Failed to search locations");
          }
          const data = await response.json();
          console.log(" here ", data.results);
          setLikelyLocations([...data]);
          setSearching(false);
        } catch (error) {
          console.log(error);
        }
      };
      geolocate();
    }
  }, [searchText]);

  return (
    <div className="search_component flex flex-col items-center w-1/2 max-md:w-full">
      <form className="flex gap-2 max-xs:flex-col items-center justify-center w-full">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-full flex items-center xs:max-md:w-[75%] bg-neutral-800 hover:bg-neutral-700 focus:border text-neutral-200 text-sm rounded-lg focus:ring-neutral-200 focus:border-neutral-200 p-2.5 ">
          <MyIcon icon="search" />
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            id="simple-search"
            required
            className=" focus:ring-0 w-full p-1 outline-0 "
          />
        </div>
        <button
          type="submit"
          className="xs:max-md:w-[25%] max-xs:w-full p-2.5 ms-2 text-sm font-medium text-neutral-0 bg-blue-500 rounded-lg  hover:bg-blue-700 focus:border focus:ring-blue-500 focus:border-blue-500 "
        >
          Search
        </button>
      </form>
      {searchText && (
        <SearchResults
          searching={searching}
          likelyLocations={likelyLocations}
        />
      )}
    </div>
  );
};

const SearchResults = ({ searching, likelyLocations }) => {
  if (searching) {
    return (
      <div className="w-full flex items-center bg-neutral-800 hover:bg-neutral-700 focus:border text-neutral-200 text-sm rounded-lg focus:ring-neutral-200 focus:border-neutral-200 p-2.5 ">
        <MyIcon icon="search" />
        <p>Search in progress</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-neutral-800 hover:bg-neutral-700 focus:border text-neutral-200 text-sm rounded-lg focus:ring-neutral-200 focus:border-neutral-200 p-2.5 ">
      {likelyLocations.map((item) => (
        <p key={item.id} className="">
          {item.name}
        </p>
      ))}
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
