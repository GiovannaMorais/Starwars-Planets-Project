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
    order: {
      column: 'population',
      sort: 'ASC',
    },
  };
  const [filter, setFilter] = useState(innitialFilter);
  const [allPlanets, setAllPlanets] = useState([]);
  const [sort, setSort] = useState('ASC');
  const [column, setColumn] = useState('name');
  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const fetchEndpoint = async (url) => {
      const data = await FetchApi(url);
      setAllPlanets(data.results);
      setPlanets(data.results);
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
    sort,
    setSort,
    column,
    setColumn,
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
