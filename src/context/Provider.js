import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import FetchApi from '../services/FetchApi';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);

  const innitialFilter = {
    filterByName: {
      name: '',
    },
  };
  const [filter, setFilter] = useState(innitialFilter);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await FetchApi(url);
    // console.log(data);
    // console.log(data.results);
    setPlanets(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    planetsFiltered,
    setPlanetsFiltered,
    filter,
    setFilter,
  };
  return (
    <myContext.Provider value={ contextValue }>
      { children }
    </myContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
