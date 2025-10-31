import { createContext, useState } from "react";

export const WeatherInfoContext = createContext({
  theme: "light",
  setTheme: () => {},
  openDays: false,
  setOpenDays: () => {},
  selectedDay: "",
  setSelectedDay: () => {},
});

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
    <WeatherInfoContext.Provider
      value={{...value}}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};
