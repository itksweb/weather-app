import { getHourlyFromSelectedDay } from "../utils";

export const WeatherMain = ({ current }) => {
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

export const WeatherMore = ({ current }) => {
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

export const DailyForcast = ({ weekData }) => {
  return (
    <div className="">
      <h4 className="text-xl">Daily forecast</h4>
      <div className="grid grid-cols-7 gap-3">
        {weekData.map((item) => {
          return (
            <div
              key={item[0]}
              className="min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md"
            >
              <p className="">{item[0]}</p>
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

const ButtonWithIcon = ({ setOpenDays, openDays, selectedDay }) => {
  return (
    <button
      onClick={() => setOpenDays(!openDays)}
      type="button"
      className="text-white bg-neutral-700 cursor-pointer focus:outline-none  font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center "
    >
      {selectedDay}
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
  );
};

const SidebarHead = ({ setOpenDays, selectedDay, openDays }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="hourly">Hourly forecast</p>
      <ButtonWithIcon
        setOpenDays={setOpenDays}
        selectedDay={selectedDay}
        openDays={openDays}
      />
    </div>
  );
};

const DaysDropdown = ({ setSelectedDay, setOpenDays, weekData }) => {
  const handleClick = (day, index) => {
    setSelectedDay(day);
    getHourlyFromSelectedDay(index, daily, hourly)
    setOpenDays(false);
  };
  return (
    <div className="z-10 grid gap-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-40 absolute right-0 ">
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

export const WeatherSidebar = ({
  setOpenDays,
  selectedDay,
  openDays,
  setSelectedDay,
  weekData,
  hourlyData,
}) => {
  return (
    <div className="vert-scroll sidebar col-span-7 relative overflow-y-scroll h-[550px] bg-neutral-800 p-6 rounded-lg flex flex-col justify-evenly gap-2 ">
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
