import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Props = {
  data: Record<string, string>;
};
function GetCountryMatch({ data }: Props) {
  const countries = useMemo(
    () => Object.keys(data).sort(() => (Math.random() > 0.5 ? -1 : 1)),
    [data]
  );
  const cities = useMemo(
    () => Object.values(data).sort(() => (Math.random() > 0.5 ? -1 : 1)),
    [data]
  );

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    console.log({ country: selectedCountry, city: selectedCity });
  }, [selectedCountry, selectedCity]);

  const countryClickHandler = (country: string) => {
    if (selectedCity) {
      evaluate(country, selectedCity);
      return;
    }

    if (selectedCountry === country) {
      setSelectedCountry(null);
      return;
    }
    if (!selectedCountry) {
      setSelectedCountry(country);
      return;
    }
  };

  const cityClickHandler = (city: string) => {
    if (selectedCountry) {
      evaluate(selectedCountry, city);
      return;
    }

    if (selectedCity === city) {
      setSelectedCity(null);
      return;
    }
    if (!selectedCity) {
      setSelectedCity(city);
      return;
    }
  };

  const evaluate = (country: string, city: string) => {
    if (data[country] === city) {
      alert("Correct!");
    } else {
      alert("Wrong!");
    }

    reset();
  };
  const reset = () => {
    setSelectedCity(null);
    setSelectedCountry(null);
  };

  return (
    <section className='container'>
      <div className='countries'>
        {countries.map((country) => (
          <button
            style={{
              backgroundColor: selectedCountry === country ? "blueviolet" : "",
            }}
            onClick={() => countryClickHandler(country)}
            key={country}
          >
            {country}
          </button>
        ))}
      </div>
      <div className='cities'>
        {cities.map((city) => (
          <button
            style={{
              backgroundColor: selectedCity === city ? "blueviolet" : "",
            }}
            onClick={() => cityClickHandler(city)}
            key={city}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <GetCountryMatch
      data={{
        Germany: "Berlin",
        Iran: "Tehran",
      }}
    />
  );
}

export default App;
