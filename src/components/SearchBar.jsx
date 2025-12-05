import { use, useState, useEffect } from "react";
import { WeatherInfoContext } from "../store/WeatherInfoContext";
import { MyIcon } from "./parts";


const SearchResults = ({ searching, setSearchText }) => {
  const {
    setLocation,
    likelyLocations,
    setLikelyLocations,
    setCurrentLocation,
  } = use(WeatherInfoContext);

  const handleSelection = (item, desc) => {
    const { latitude, longitude } = item;
    setLocation({ latitude, longitude });
    setLikelyLocations([]);
    setCurrentLocation(`${item.name}, ${desc}`);
    setSearchText("");
  };
  if (searching) {
    return (
      <div className="w-full absolute top-15 max-xs:top-28 flex items-center bg-neutral-800 hover:bg-neutral-700 focus:border text-neutral-200 text-sm rounded-lg focus:ring-neutral-200 focus:border-neutral-200 p-2.5 ">
        <MyIcon icon="search" />
        <p>Search in progress</p>
      </div>
    );
  }

  return (
    <div className="w-full absolute top-15 max-xs:top-28 flex gap-2 items-center justify-center ">
      <div className="max-xs:w-full w-[75%] flex flex-col bg-neutral-800 text-neutral-200 text-sm rounded-lg p-1 ">
        {likelyLocations.map((item) => {
          let desc = `(${item.admin2 ? item.admin2 + ", " : ""}${
            item.admin1 ? item.admin1 + ", " : ""
          } ${item.country})`;
          return (
            <p
              onClick={() => handleSelection(item, desc)}
              key={item.id}
              className="p-2 hover:bg-neutral-700 focus:border focus:ring-neutral-200 focus:border-neutral-200 rounded-lg cursor-pointer"
            >
              <span className="font-bold">{item.name}</span>
              <span className="text-neutral-300 text-[13px] italic">
                {" "}
                {desc}
              </span>
            </p>
          );
        })}
      </div>
      <div className="w-[25%] max-xs:hidden"> </div>
    </div>
  );
};

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const { likelyLocations, setLikelyLocations } = use(WeatherInfoContext);

  let timeoutID = null;
  useEffect(() => {
    const geolocate = async () => {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchText
      )}&count=5&language=en&format=json`;
      try {
        setSearching(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to search locations");
        }
        const data = await response.json();
        console.log(" here ", data.results);
        setLikelyLocations([...data.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setSearching(false);
      }
    };
    if (searchText.trim().length > 2) {
      timeoutID = setTimeout(() => geolocate(), 500);
    } else {
      setLikelyLocations([]);
    }
    return () => clearTimeout(timeoutID);
  }, [searchText]);

  const handleInputChange = (e) => {
    clearTimeout(timeoutID);
    setSearchText(e.target.value);
  };

  return (
    <div className="relative w-1/2 max-md:w-full">
      <form className="flex gap-2 max-xs:flex-col items-center justify-center w-full">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="flex items-center cursor-pointer max-xs:w-full w-[75%] bg-neutral-800 hover:bg-neutral-700 focus-within:border text-neutral-200 text-sm rounded-lg focus-within:ring-neutral-200 focus-within:border-neutral-0 p-2.5 ">
          <MyIcon icon="search" />
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            id="simple-search"
            required
            className=" focus:ring-0 w-full p-1 outline-0 "
          />
        </div>
        <button
          type="submit"
          className="w-[25%] max-xs:w-full p-2.5 text-sm font-medium cursor-pointer text-neutral-0 bg-blue-500 rounded-lg  hover:bg-blue-700 focus:outline-2 focus:outline-neutral-0 focus:ring-4 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {likelyLocations.length ? (
        <SearchResults searching={searching} setSearchText={setSearchText} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
