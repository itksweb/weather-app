import { useState } from "react";
import { WeatherInfoContext } from "./weatherInfoContext";

const baseUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.419998&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto";

export const WeatherInfoProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [openUnits, setOpenUnits] = useState(false);
  const [apiUrl, setApiUrl] = useState(baseUrl);
  const [wispUnit, setWispUnit] = useState("");
  const [tempUnit, setTempUnit] = useState("");
  const [precUnit, setPrecUnit] = useState("");
  const [openDays, setOpenDays] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [weekData, setWeekData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [current, setCurrent] = useState({
    date: "",
    temperature: "",
    det: [],
  });

  const value = {
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
  };
  return (
    <WeatherInfoContext.Provider value={{ ...value }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};
