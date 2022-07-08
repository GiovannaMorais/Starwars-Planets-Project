import React, { useState, useEffect } from 'react';
import fetchApi from '../services/FetchApi';

const Table = () => {
  const [planets, setPlanets] = useState([]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await fetchApi(url);
    // console.log(data);
    // console.log(data.results);
    setPlanets(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
  }, []);

  const theadTr = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  // console.log('planets', planets);
  return (
    <table>
      <thead>
        <tr>
          {theadTr.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets.map((item, index) => (
          <tr key={ index }>
            <td>{item.name}</td>
            <td>{item.rotation_period}</td>
            <td>{item.orbital_period}</td>
            <td>{item.diameter}</td>
            <td>{item.climate}</td>
            <td>{item.gravity}</td>
            <td>{item.terrain}</td>
            <td>{item.surface_water}</td>
            <td>{item.population}</td>
            <td>{item.films}</td>
            <td>{item.created}</td>
            <td>{item.edited}</td>
            <td>{item.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
