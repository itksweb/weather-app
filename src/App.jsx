import { useEffect, use } from "react";
import { WeatherInfoContext } from "./store/weatherInfoContext";
import Header from "./components/Header";
import { getCurrent, getWeeksData, getHourly, fetchWeatherInfo } from "./utils";
import {
  DailyForcast,
  WeatherMain,
  WeatherMore,
  WeatherSidebar,
} from "./components/parts";

const App = () => {
  const {
    theme,
    weekData,
    setCurrent,
    setWeekData,
    setHourlyData,
    setTheme,
    setSelectedDay,
    apiUrl,
  } = use(WeatherInfoContext);

  

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

  useEffect(() => {
    const getWeatherInfo = async () => {
      const weatherInfo = await fetchWeatherInfo(apiUrl);
      const { current, current_units, daily, hourly } = weatherInfo;
      await setCurrent(() => getCurrent(current, current_units));
      setWeekData(() => getWeeksData(daily));
      setHourlyData(() => getHourly(hourly));
      localStorage.setItem("hourly", JSON.stringify(hourly))
      localStorage.setItem("daily", JSON.stringify(daily));
    };
    getWeatherInfo();
  }, [apiUrl]);

  useEffect(() => {
    if (weekData.length) {
      setSelectedDay(weekData[0][0]);
    }
  }, [weekData]);

  useEffect(() => {
    // const userThemePref = retrieveUserPref();
    // if (userThemePref && userThemePref !== theme) {
    //   setTheme(userThemePref)
    // }
    // console.log(bg)
  }, []);

  return (
    <div
      data-theme={theme}
      className={`min-h-[100vh] text-col max-lg:w-[90%] lg:max-[1440px]:w-[85%] py-10 `}
    >
      <Header />
      <main className="w-full flex flex-col items-center gap-7 relative mt-2 ">
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
        <div className="grid grid-cols-20 w-full gap-7 ">
          <div className="main col-span-13 flex gap-6 flex-col h-[70%]">
            <WeatherMain />
            <WeatherMore />
            <DailyForcast />
          </div>
          <WeatherSidebar />
        </div>
      </main>
    </div>
  );
};

export default App;
