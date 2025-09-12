const Unit = ({ children }) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between cursor-pointer py-1 px-2 rounded-md hover:bg-neutral-700"
    >
      <span className="text-neutral-0 text-sm">{children}</span>
      <img
        src={`/assets/images/icon-checkmark.svg`}
        alt="checkmark icon"
        className="hidden"
      />
    </button>
  );
};

export const UnitsDropdown = () => {
  return (
    <div className="z-10 grid gap-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-46 absolute right-0 ">
      <div className="pb-2 border-b border-b-neutral-600">
        <p className="text-sm text-neutral-300">Temperature </p>
        <Unit>Celcius (&deg;C)</Unit>
        <Unit>Fahrenheit (&deg;F)</Unit>
      </div>
      <div className="pb-2 border-b border-b-neutral-600">
        <p className="text-sm text-neutral-300">Wind speed </p>
        <Unit>km/h</Unit>
        <Unit>mph</Unit>
      </div>
      <div className="">
        <p className="text-sm text-neutral-300">Precipitation </p>
        <Unit>Millimeters (mm)</Unit>
        <Unit>Inches (in)</Unit>
      </div>
    </div>
  );
};

export const DayOfWeek = ({setSelectedDay, setOpenDays}) => {
    const handleClick = (day) => {
        setSelectedDay(day);
        setOpenDays(false);
    }
  return (
    <div className="z-10 grid gap-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-40 absolute right-0 ">
      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((it) => (
        <button
          onClick={() =>handleClick(it)}
          key={it}
          className="text-sm w-full rounded-md p-2 hover:bg-neutral-700 text-neutral-200"
        >
          {it}{" "}
        </button>
      ))}
    </div>
  );
};
