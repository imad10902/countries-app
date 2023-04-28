import React, { useEffect, useState } from 'react';
import { FilteredCountries } from './FilteredCountries';
import { Search } from '../search/Search';
import LoadingSpinner from './Loading/LoadingSpinner';

export const Countries = () => {
  const url = `http://localhost:4200`;
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundFilter, setFoundFilter] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const fetchCountries = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchCountries().then((items) => {
      if (mounted) {
        fetchCountries(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput) {
      setFiltered(
        countries.filter((country) =>
          Object.values(country)
            .join('')
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        ),
      );
      setFoundFilter(true);
      if (filtered.length <= 0) {
        setFoundFilter(false);
      }
    } else {
      setFiltered(countries);
    }
  };

  return (
    <>
      <Search
        searchCountries={searchCountries}
        searchInput={searchInput}
        setCountries={setCountries}
      />

      {isLoading ? (
       <div style={{justifyContent: "center", display:"flex"}}><LoadingSpinner/></div> 
      ) : (
        <>
          {searchInput.length > 0 ? (
            <FilteredCountries filtered={filtered} foundFilter={foundFilter} />
          ) : 
          ''}
        </>
      )}
    </>
  );
};
