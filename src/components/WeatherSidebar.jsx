import { use, useRef, useEffect } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { createRandomArrayWithUniqueStrings, getHourlyFromSelectedDay } from "../utils";
import { ButtonWithIcon } from "./parts";


const SidebarHead = () => {
  const { openDays, setOpenDays, selectedDay } = use(WeatherInfoContext);
  return (
    <div className="flex items-center justify-between">
      <p className="hourly">Hourly forecast</p>
      <ButtonWithIcon
        action={() => setOpenDays(!openDays)}
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

const HourlyForecast = () => {
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

  const HourlyUnit = ({ item }) => {
    if (isLoading) {
      return (
        <div className=" p-5 w-full bg-neutral-700 ring ring-neutral-600 rounded-md"></div>
      );
    }
    return (
      <div className=" p-2 w-full bg-neutral-700 ring ring-neutral-600 flex items-center justify-between rounded-md">
        <div className="flex items-center justify-start">
          <img
            src={`/assets/images/icon-${item[2]}.webp`}
            alt={item[2]}
            className="size-7"
          />
          <span className="le">{item[0]}</span>
        </div>
        <span className="ri">{item[1]}&deg;</span>
      </div>
    );
  };

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
        ))}
      </>
    </div>
  );
};

export default HourlyForecast
