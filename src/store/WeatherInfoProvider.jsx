import { useState} from "react";
import { WeatherInfoContext } from "./WeatherInfoContext";

const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=auto`;

export const WeatherInfoProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [apiUrl, setApiUrl] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [weekData, setWeekData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [likelyLocations, setLikelyLocations] = useState([]);
  const [openDays, setOpenDays] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 52.52,
    longitude: 13.41,
  });
  
  const [current, setCurrent] = useState({
    date: "",
    temperature: "",
    det: [],
    iconName: "",
  });

  const value = {
    currentLocation,
    setCurrentLocation,
    location,
    setLocation,
    theme,
    setTheme,
    openDays,
    setOpenDays,
    selectedDay,
    setSelectedDay,
    apiUrl,
    setApiUrl,
    weekData,
    setWeekData,
    hourlyData,
    setHourlyData,
    current,
    setCurrent,
    isError,
    setIsError,
    isLoading,
    setIsLoading,
    likelyLocations,
    setLikelyLocations,
  };
  return (
    <WeatherInfoContext.Provider value={{ ...value }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};
