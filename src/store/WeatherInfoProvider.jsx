import { useState } from "react";
import { WeatherInfoContext } from "./weatherInfoContext";
import { baseUrl } from "../utils";

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
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    isError,
    setIsError,
    isLoading,
    setIsLoading,
  };
  return (
    <WeatherInfoContext.Provider value={{ ...value }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};
