import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [currentCont, setCurrentCont] = useState("asia");
  const [countries, setCountries] = useState([]);

  const getData = (region) => {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => res.json())
      .then((data) =>
        setCountries(
          data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        )
      );
  };

  useEffect(() => {
    console.log(currentCont);
    getData(currentCont);
  }, [currentCont]);

  useEffect(() => {
    console.log(
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    );
  }, [countries]);

  return (
    <div className="main">
      <select
        onChange={(e) => {
          setCurrentCont(e.target.value);
        }}
      >
        <option value="asia">Asia</option>
        <option value="africa">Africa</option>
        <option value="north america">North America</option>
        <option value="south america">South America</option>
        <option value="europe">Europe</option>
        <option value="oceania">Australia and Oceania</option>
      </select>
      <div className="countries">
        {countries.map((country) => (
          <div className="countryDiv">
            <div className="imgDiv">
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
            <div className="textDiv">
              <p className="countryName">
                {country.name.common + " " + country.flag}
              </p>
              <p className="capital">{country.capital?.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
