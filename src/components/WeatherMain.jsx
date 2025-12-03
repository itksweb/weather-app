import { use } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { MyIcon } from "./parts";


const WeatherMain = () => {
  const { current, isLoading, currentLocation } = use(WeatherInfoContext);
  if (isLoading) {
    return (
      <div className="rounded-lg gap-5 flex items-center justify-center flex-col p-5 bg-neutral-700 min-h-[210px]">
        <MyIcon icon="loading" />
        <p>Loading ...</p>
      </div>
    );
  }
  return (
    <div className="weather-main rounded-lg max-xs:flex-col flex items-center justify-between p-5 bg-neutral-700 min-h-[210px] bg-[url(/assets/images/bg-today-large.svg)] max-sm:bg-[url(/assets/images/bg-today-small.svg)] bg-cover">
      <div className="lef flex flex-col items-start max-xs:items-center">
        <p className="place">
          {currentLocation ? currentLocation : current.location}
        </p>
        <p className="date">{current.date}</p>
      </div>
      <div className="rig flex items-center justify-end">
        <img
          src={`/assets/images/icon-${current.iconName}.webp`}
          alt={current.iconName}
          className="size-[80px]"
        />
        <span className="text-5xl">{current.temperature}&deg;</span>
      </div>
    </div>
  );
};

export default WeatherMain;