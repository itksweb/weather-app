import { useEffect, use } from "react";
import { WeatherInfoContext } from "./store/WeatherInfoContext";
import { getCurrent, getWeeksData, getHourly, fetchWeatherInfo } from "./utils";
import {
  DailyForcast,
  ErrorComponenet,
  SearchBar,
  WeatherMain,
  WeatherMore,
  WeatherSidebar,
  Header,
} from "./components/parts";

const App = () => {
  const {
    theme,
    weekData,
    setCurrent,
    setWeekData,
    setHourlyData,
    setApiUrl,
    setSelectedDay,
    apiUrl,
    isError,
    isLoading,
    setIsError,
    location,
    setLocation,
    setIsLoading,
  } = use(WeatherInfoContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    console.log("setted");
  }, []); // get user's location

  useEffect(() => {
    const { latitude, longitude } = location;
    setApiUrl(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=auto`
    );
    console.log("location: ", location);
  }, [location]); // updates apiUrl based on user's location

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        setIsLoading(true);
        const weatherInfo = await fetchWeatherInfo(apiUrl); //apiUrl
        const { timezone, current, current_units, daily, hourly } = weatherInfo;
        await setCurrent(() => getCurrent(current, current_units, timezone));
        setWeekData(() => getWeeksData(daily));
        setHourlyData(() => getHourly(hourly));
        setIsLoading(false);
        localStorage.setItem("hourly", JSON.stringify(hourly));
        localStorage.setItem("daily", JSON.stringify(daily));
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };
    if (apiUrl) getWeatherInfo();
  }, [apiUrl]);

  useEffect(() => {
    if (weekData.length) {
      setSelectedDay(weekData[0][0]);
    }
  }, [weekData]);

  // useEffect(() => {
  //   const userThemePref = retrieveUserPref();
  //   if (userThemePref && userThemePref !== theme) {
  //     setTheme(userThemePref)
  //   }
  // }, []);

  return (
    <div
      data-theme={theme}
      className={`min-h-[100vh] text-col py-10 flex flex-col items-center`}
    >
      <Header />
      {isError ? (
        <ErrorComponenet />
      ) : (
        <main className="w-full flex flex-col items-center gap-7 relative mt-2 ">
          <h1 className="text-4xl my-7">How's the sky looking today?</h1>
          <SearchBar />
          <div className="grid ts:grid-cols-10 w-full gap-7 ">
            <div className="main min-tb:col-span-7 ts:max-tb:col-span-6 flex gap-6 flex-col h-[70%]">
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
