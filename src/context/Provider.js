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
    filterByNumericValues: [],

  };
  const [filter, setFilter] = useState(innitialFilter);
  const [allPlanets, setAllPlanets] = useState([]);
  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const fetchEndpoint = async (url) => {
      const data = await FetchApi(url);
      setAllPlanets(data.results);
      setPlanets(data.results);
      console.log('data.results', data.results);
    };
    fetchEndpoint(endpoint);
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    planetsFiltered,
    setPlanetsFiltered,
    filter,
    setFilter,
    allPlanets,
    setAllPlanets,
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
