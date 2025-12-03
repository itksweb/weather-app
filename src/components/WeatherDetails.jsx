import { use } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { notIt } from "../utils";

const WeatherDetails = () => {
  const { current, isLoading } = use(WeatherInfoContext);
  const data = isLoading ? notIt : current.det;

  return (
    <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-3">
      {data.map((item, index) => {
        return (
          <div
            key={isLoading ? item : item[0]}
            className="min-h-[70px] p-3 bg-neutral-800 ring ring-neutral-600 col-span-1 rounded-md "
          >
            <p className="text-sm font-light">{notIt[index]}</p>
            <p className="text-lg tt:max-[1030px]:text-base  mt-3">
              {isLoading ? "__" : item[1]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WeatherDetails;
