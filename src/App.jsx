import { useEffect, use } from "react";
import { WeatherInfoContext } from "./store/weatherInfoContext";
import { getCurrent, getWeeksData, getHourly, fetchWeatherInfo } from "./utils";
import {
  DailyForcast,
  ErrorComponenet,
  SearchBar,
  WeatherMain,
  WeatherMore,
  WeatherSidebar,
  Header
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
    isError,
    isLoading,
    setIsError,
    setIsLoading,
  } = use(WeatherInfoContext);

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        setIsLoading(true)
        const weatherInfo = await fetchWeatherInfo(apiUrl);
        const { current, current_units, daily, hourly } = weatherInfo;
        await setCurrent(() => getCurrent(current, current_units));
        setWeekData(() => getWeeksData(daily));
        setHourlyData(() => getHourly(hourly));
        setIsLoading(false)
        localStorage.setItem("hourly", JSON.stringify(hourly));
        localStorage.setItem("daily", JSON.stringify(daily));
      } catch (error) {
        setIsError(true)
        console.log(error)
      }
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
      className={`min-h-[100vh] text-col max-lg:w-[90%] lg:max-[1440px]:w-[85%] py-10 flex flex-col items-center`}
    >
      <Header />
      {isError && <ErrorComponenet />}
      {!isError && (
        <main className="w-full flex flex-col items-center gap-7 relative mt-2 ">
          <h1 className="text-4xl my-7">How's the sky looking today?</h1>
          <SearchBar />
          <div className="grid grid-cols-20 w-full gap-7 ">
            <div className="main col-span-13 flex gap-6 flex-col h-[70%]">
              <WeatherMain />
              <WeatherMore />
              <DailyForcast />
            </div>
            <WeatherSidebar />
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
