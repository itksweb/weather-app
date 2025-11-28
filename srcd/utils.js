export const baseUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.419998&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto";

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

export const createRandomArray = (length, min = 1, max = 9) => {
  return Array.from(
    { length: length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export const createRandomArrayWithUniqueStrings = (count, length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const set = new Set();
  while (set.size < count) {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    set.add(str);
  }

  return Array.from(set);
}

export const notIt = [ "Feels Like", "Humidity", "Wind", "Precipitation"];
