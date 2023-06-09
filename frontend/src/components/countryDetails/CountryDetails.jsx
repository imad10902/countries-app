import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingDetails } from '../LoadingDetails';
import { BsArrowLeft } from 'react-icons/bs';

export const CountryDetails = () => {
  const [country, setCountry] = useState([]);
  const [borderCountries, setBorderCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { name } = useParams();

  useEffect(() => {
    window.scroll(0, 0);
    const fetchCountryData = async (name) => {
      try {
        const url = `http://localhost:4200/country?q=${name}`;
        const response = await fetch(url, {
          method: 'GET',
        });
        const data = await response.json();
        setCountry(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountryData(name);
  }, [name]);

  return (
    <main>
      {isLoading ? (
        <LoadingDetails />
      ) : (
        <AnimatePresence>
          <Link to="/" className="backBtn">
            <span>
              <BsArrowLeft />
            </span>{' '}
            Back
          </Link>
          <div key={name} className="countryDetails">
            <motion.img
              initial={{
                opacity: 0,
                translateX: -500,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.5,
                translateX: -500,
              }}
              exit={{
                opacity: 0,
                translateX: -500,
              }}
              src={country.flags.svg}
              alt={name}
            />

            <div className="countryDetailsInfo">
              <h2>{name}</h2>
              <div className="detailsSection">
                <ul className="left">
                  <li>
                    <span>Native Name:</span> {country.nativeName}
                  </li>
                  <li>
                    <span>Population:</span>{' '}
                    {country.population.toLocaleString()}
                  </li>
                  <li>
                    <span>Region:</span> {country.region}
                  </li>
                  <li>
                    <span>Sub Region:</span> {country.subregion}
                  </li>
                  <li>
                    <span>Capital:</span> {country.capital}
                  </li>
                </ul>
                <ul className="right">
                  <li>
                    <span>Top Level Domain:</span> {country.topLevelDomain}
                  </li>
                  <li>
                    <span>Currencies:</span> {country.currencies[0].name}
                  </li>
                  <li>
                    <span>Languages:</span> {country.languages[0].name}
                  </li>
                </ul>
              </div>

              
            </div>
          </div>
        </AnimatePresence>
      )}
    </main>
  );
};
