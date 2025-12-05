import { use } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { createRandomArrayWithUniqueStrings } from "../utils";

const DailyForcast = () => {
  const { weekData, isLoading } = use(WeatherInfoContext);
  const data = isLoading ? createRandomArrayWithUniqueStrings(7) : weekData;

  const DailyForcastUnit = ({ item }) => {
    if (isLoading) {
      return (
        <div className=" min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md"></div>
      );
    }
    return (
      <div className="min-h-[120px] px-2 py-1 ring ring-neutral-600 bg-neutral-800 flex flex-col justify-between col-span-1 rounded-md">
        <p className="">{item[0].slice(0, 3)}</p>
        <img
          src={`/assets/images/icon-${item[3]}.webp`}
          alt={item[3]}
          className=""
        />
        <div className="flex items-end justify-between text-[14px] max-xl:text-[12px] max">
          <span className="le">{item[1]}&deg;</span>
          <span className="ri">{item[2]}&deg;</span>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <h4 className="text-xl mb-2">Daily forecast</h4>
      <div className="grid grid-cols-7 xs:max-md:grid-cols-4 ts:max-tb:grid-cols-4 max-xs:grid-cols-3 gap-3">
        {data.map((item) => (
          <DailyForcastUnit
            key={isLoading ? item : item[0]}
            item={item}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
export default DailyForcast