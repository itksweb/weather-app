import { useState, useEffect } from "react";
import { WeatherInfoContext } from "./WeatherInfoContext";
// import { baseUrl } from "../utils";

const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=auto`;

export const WeatherInfoProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [openUnits, setOpenUnits] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [wispUnit, setWispUnit] = useState("");
  const [tempUnit, setTempUnit] = useState("");
  const [precUnit, setPrecUnit] = useState("");
  const [openDays, setOpenDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [weekData, setWeekData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [likelyLocations, setLikelyLocations] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 52.52,
    longitude: 13.41,
  });
  const [currentLocation, setCurrentLocation] = useState("");
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
    openUnits,
    setOpenUnits,
    apiUrl,
    setApiUrl,
    weekData,
    setWeekData,
    hourlyData,
    setHourlyData,
    current,
    setCurrent,
    precUnit,
    setPrecUnit,
    tempUnit,
    setTempUnit,
    wispUnit,
    setWispUnit,
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
