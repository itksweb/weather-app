import { useEffect, useState } from "react";
import Header from "./components/Header";
import { DayOfWeek, UnitsDropdown } from "./components/Dropdown";
import { fetchWeatherApi } from "openmeteo";
const apiKey = import.meta.env.VITE_IPIFY_API_KEY;

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [openUnits, setOpenUnits] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const retrieveUserPref = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  };
  const switchTheme = () => {
    const myTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", myTheme);
    setTheme(myTheme);
  };
  // console.log(localStorage.getItem("theme"));

  useEffect(() => {
    const useripurl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
    const getData = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        //  return data;
      } catch (error) {
        console.error(error);
      }
    };
    const getWeatherInfo = async () => {
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=5.5174&longitude=5.7501&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=precipitation,temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto";
      const responses = await fetch(url);
      const data = await responses.json();
      console.log(data);
    };
    getData(useripurl);
    // getWeatherInfo();
  }, []);

  useEffect(() => {
    // const userThemePref = retrieveUserPref();
    // if (userThemePref && userThemePref !== theme) {
    //   setTheme(userThemePref)
    // }
    // console.log(bg)
  }, []);

  const Fhwp = ({ text }) => {
    return (
      <div className="min-h-[70px] p-3 bg-neutral-800 ring ring-neutral-600 col-span-1 rounded-md ">
        <p className="text-sm font-light">{text}</p>
        <p className="text-lg mt-3">14 km/h</p>
      </div>
    );
  };

  const DailyForecast = ({ text }) => {
    return (
      <div className="min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md">
        <p className="">{text}</p>
        <img
          src="/assets/images/icon-drizzle.webp"
          alt="drizzle"
          className=""
        />
        <div className="flex items-end justify-between">
          <span className="le">20&deg;</span>
          <span className="ri">24&deg;</span>
        </div>
      </div>
    );
  };

  const HourlyForecast = ({ text }) => {
    return (
      <div className=" p-2 w-full bg-neutral-700 ring ring-neutral-600 flex items-center justify-between rounded-md">
        <div className="flex items-center justify-start">
          <img
            src="/assets/images/icon-drizzle.webp"
            alt="drizzle"
            className="size-7"
          />
          <span className="le">{text}</span>
        </div>
        <span className="ri">24&deg;</span>
      </div>
    );
  };

  return (
    <div
      data-theme={theme}
      className={`min-h-[100vh] text-col max-lg:w-[90%] lg:max-[1440px]:w-[85%] py-10 `}
    >
      <Header
        theme={theme}
        switchTheme={switchTheme}
        openUnits={openUnits}
        setOpenUnits={setOpenUnits}
      />
      <main className="w-full flex flex-col items-center gap-7 relative mt-2 ">
        {openUnits ? <UnitsDropdown /> : <></>}
        <h1 className="text-4xl my-7">How's the sky looking today?</h1>
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
        <div className="grid grid-cols-20 w-full gap-7">
          <div className="main col-span-13 flex gap-6 flex-col">
            <div className="weather-main rounded-lg flex items-center justify-between p-5 bg-neutral-700 min-h-[210px] bg-[url(/assets/images/bg-today-large.svg)] max-sm:bg-[url(/assets/images/bg-today-small.svg)] bg-cover">
              <div className="lef">
                <p className="place">Berlin</p>
                <p className="date">Wed, Sept 9, 2025</p>
              </div>
              <div className="flex items-center justify-end">
                <img
                  src="/assets/images/icon-sunny.webp"
                  alt="sunny"
                  className="size-[80px]"
                />
                <span className="text-5xl">20&deg;</span>
              </div>
            </div>
            <div className="fhwp grid grid-cols-4 gap-3">
              {["Feel Like", "Humidity", "Wind", "Precipitation"].map(
                (item) => (
                  <Fhwp key={item} text={item} />
                )
              )}
            </div>
            <div className="daily-forecast">
              <h4 className="text-xl">Daily forecast</h4>
              <div className="fhwp grid grid-cols-7 gap-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (item) => (
                    <DailyForecast key={item} text={item} />
                  )
                )}
              </div>
            </div>
          </div>
          <div className="sidebar col-span-7 relative bg-neutral-800 p-6 rounded-lg flex flex-col justify-evenly gap-2 ">
            <div className="flex items-center justify-between">
              <p className="hourly">Hourly forecast</p>
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
            </div>
            {openDays ? (
              <DayOfWeek
                setSelectedDay={setSelectedDay}
                setOpenDays={setOpenDays}
              />
            ) : (
              <></>
            )}
            <>
              {[
                "3 PM",
                "4 PM",
                "5 PM",
                "6 PM",
                "7 PM",
                "8 PM",
                "9 PM",
                "10 PM",
              ].map((ite) => (
                <HourlyForecast key={ite} text={ite} />
              ))}
            </>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
