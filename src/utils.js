// Weather code mappings for icons
export const weatherCodes = {
  0: { description: "Clear sky", icon: "sunny" },
  1: { description: "Mainly clear", icon: "sunny" },
  2: { description: "Partly cloudy", icon: "partly-cloudy" },
  3: { description: "Overcast", icon: "overcast" },
  45: { description: "Fog", icon: "fog" },
  48: { description: "Depositing rime fog", icon: "fog" },
  51: { description: "Light drizzle", icon: "drizzle" },
  53: { description: "Moderate drizzle", icon: "drizzle" },
  55: { description: "Dense drizzle", icon: "drizzle" },
  56: { description: "Light freezing drizzle", icon: "drizzle" },
  57: { description: "Dense freezing drizzle", icon: "drizzle" },
  61: { description: "Slight rain", icon: "rain" },
  63: { description: "Moderate rain", icon: "rain" },
  65: { description: "Heavy rain", icon: "rain" },
  66: { description: "Light freezing rain", icon: "rain" },
  67: { description: "Heavy freezing rain", icon: "rain" },
  71: { description: "Slight snow fall", icon: "snow" },
  73: { description: "Moderate snow fall", icon: "snow" },
  75: { description: "Heavy snow fall", icon: "snow" },
  77: { description: "Snow grains", icon: "snow" },
  80: { description: "Slight rain showers", icon: "rain" },
  81: { description: "Moderate rain showers", icon: "rain" },
  82: { description: "Violent rain showers", icon: "rain" },
  85: { description: "Slight snow showers", icon: "snow" },
  86: { description: "Heavy snow showers", icon: "snow" },
  95: { description: "Thunderstorm", icon: "storm" },
  96: { description: "Thunderstorm with slight hail", icon: "storm" },
  99: { description: "Thunderstorm with heavy hail", icon: "storm" },
};

export const baseUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=auto";


const getIconUrl = (code) => weatherCodes[code].icon;

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
  return date.toLocaleDateString("en-US", { weekday: "long" });
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

export const getCurrent = (current, current_units, timezone) => {
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
    iconName: getIconUrl(current.weather_code),
    location: timezone.replace("/", ", "),
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
    const iconName = getIconUrl(daily.weather_code[index]);
    return [dayOfWeek, max, min, iconName];
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
      const iconName = getIconUrl(hourly.weather_code[index]);
      let piece = [getHourlyTime(item), hourly.temperature_2m[index], iconName];
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
      const iconName = getIconUrl(hourly.weather_code[index]);
      let piece = [getHourlyTime(item), hourly.temperature_2m[index], iconName];
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
  console.log("done ", data);
  return data;
};

export const createRandomArray = (length, min = 1, max = 9) => {
  return Array.from(
    { length: length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

export const createRandomArrayWithUniqueStrings = (count, length = 6) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const set = new Set();
  while (set.size < count) {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    set.add(str);
  }

  return Array.from(set);
};

export const notIt = ["Feels Like", "Humidity", "Wind", "Precipitation"];
