const Unit = ({ children, value, func, recvd }) => {
  return (
    <button
      type="button"
      onClick={() => func(value)}
      className={`flex w-full items-center justify-between cursor-pointer py-1 px-2 rounded-md hover:bg-neutral-700 ${
        recvd === value ? "bg-neutral-700 rounded-sm" : ""
      }`}
    >
      <span className="text-neutral-0 text-sm">{children}</span>
      <img
        src={`/assets/images/icon-checkmark.svg`}
        alt="checkmark icon"
        className={recvd === value ? "" : "hidden"}
      />
    </button>
  );
};
export const UnitsDropdown = ({
  setPrecUnit,
  setWispUnit,
  setTempUnit,
  precUnit,
  wispUnit,
  tempUnit,
}) => {
  const handleUnitSwitch = (e) => {
    if (e.target.value === "metric") {
      setPrecUnit("");
      setTempUnit("");
      setWispUnit("");
    } else if (e.target.value === "imperial") {
      setPrecUnit("inch");
      setTempUnit("fahrenheit");
      setWispUnit("mph");
    }
  }
  return (
    <div className="z-10  space-y-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-46 absolute right-0 ">
      <div className="grid grid-cols-2 gap-2 ">
        <button onClick={handleUnitSwitch} value="imperial" className="switch font-bold p-1.5 text-[12px] bg-neutral-700 hover:bg-neutral-600 rounded-sm">
          IMPERIAL
        </button>
        <button onClick={handleUnitSwitch} value="metric" className="switch font-bold p-1.5 text-[12px] bg-neutral-700 hover:bg-neutral-600 rounded-sm">
          METRIC
        </button>
      </div>
      <div className="pb-2 border-b border-b-neutral-600">
        <h4 className="text-sm text-neutral-300">Temperature </h4>
        <Unit value="" func={setTempUnit} recvd={tempUnit}>
          Celcius (&deg;C)
        </Unit>
        <Unit value="fahrenheit" func={setTempUnit} recvd={tempUnit}>
          Fahrenheit (&deg;F)
        </Unit>
      </div>
      <div className="pb-2 border-b border-b-neutral-600">
        <h4 className="text-sm text-neutral-300">Wind speed </h4>
        <Unit value="" func={setWispUnit} recvd={wispUnit}>
          km/h
        </Unit>
        <Unit value="mph" func={setWispUnit} recvd={wispUnit}>
          mph
        </Unit>
      </div>
      <div className="">
        <h4 className="text-sm text-neutral-300">Precipitation </h4>
        <Unit value="" func={setPrecUnit} recvd={precUnit}>
          Millimeters (mm)
        </Unit>
        <Unit value="inch" func={setPrecUnit} recvd={precUnit}>
          Inches (in)
        </Unit>
      </div>
    </div>
  );
};

export const DaysDropdown = ({ setSelectedDay, setOpenDays, weekData }) => {
  const handleClick = (day) => {
    setSelectedDay(day);
    setOpenDays(false);
  };
  return (
    <div className="z-10 grid gap-3 bg-neutral-800 ring ring-neutral-600 p-2 rounded-md shadow-sm w-40 absolute right-0 ">
      {weekData.map((it) => (
        <button
          onClick={() => handleClick(it[0])}
          key={it[0]}
          className="text-sm w-full rounded-md p-2 hover:bg-neutral-700 text-neutral-200"
        >
          {it[0]}
        </button>
      ))}
    </div>
  );
};
