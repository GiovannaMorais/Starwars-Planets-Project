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
    filterByNumericValues: [
      // {
      //   column: '',
      //   comparison: ' ',
      //   value: '',
      // },
    ],
  };
  const [filter, setFilter] = useState(innitialFilter);
  const [columns, setColumns] = useState(['orbital_period', 'population',

    'diameter',
    'rotation_period',
    'surface_water']);

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const fetchEndpoint = async (url) => {
      const data = await FetchApi(url);
      // console.log(data);
      // console.log(data.results);
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
    columns,
    setColumns,
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
