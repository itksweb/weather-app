export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short", // "Tue"
    month: "short", // "Oct"
    day: "numeric", // "28"
    year: "numeric", // "2025"
  });
};

export const getWeekDayShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

export const getHourlyTime = (dateString) => {
  const date = new Date(dateString);
  const ttt = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return ttt.replace(":00", "");
};

export const getCurrent = (current, current_units) => {
  const feelsLike =
    current.apparent_temperature + current_units.apparent_temperature;
  const humidity =
    current.relative_humidity_2m + current_units.relative_humidity_2m;
  const wind = current.wind_speed_10m + ` ${current_units.wind_speed_10m}`;
  const precipitation =
    current.precipitation + ` ${current_units.precipitation}`;
  return {
    date: formatDate(current.time),
    temperature: current.temperature_2m,
    det: [
      ["Feels Like", feelsLike],
      ["Humidity", humidity],
      ["Wind", wind],
      ["Precipitation", precipitation],
    ],
  };
};

export const getWeeksData = (daily) => {
  const dailyF = daily.time.map((item, index) => {
    const dayOfWeek = getWeekDayShort(item);
    const max = daily.temperature_2m_max[index];
    const min = daily.temperature_2m_min[index];
    return [dayOfWeek, max, min];
  });
  return dailyF;
};
export const getHourly = (hourly) => {
  let date = new Date();
  let dayOfMonth = date.getDate();
  let hourOfDay = date.getHours();
  let hrly = [];
  for (let index = 0; index < hourly.time.length; index++) {
    const item = hourly.time[index];
    const itemDate = item.slice(8, 10);
    const itemHour = item.slice(11, 13);
    if (itemDate == dayOfMonth && itemHour >= hourOfDay) {
      let piece = [getHourlyTime(item), hourly.temperature_2m[index]];
      hrly = [...hrly, piece];
    }
  }
  return hrly;
};

export const getHourlyFromSelectedDay = (i) => {
  const hourly = JSON.parse(localStorage.getItem("hourly"));
  const daily = JSON.parse(localStorage.getItem("daily"));
  let hrly = [];
  for (let index = 0; index < hourly.time.length; index++) {
    const item = hourly.time[index];
    if (item.startsWith(daily.time[i])) {
      let piece = [getHourlyTime(item), hourly.temperature_2m[index]];
      hrly = [...hrly, piece];
    }
  }
  return hrly;
};

export const fetchWeatherInfo = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather information");
  }
  const data = await response.json();
  console.log("done ",data)
  return data;
};
