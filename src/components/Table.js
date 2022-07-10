import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';
import FilterSearch from './FilterSearch';
import FilterNumberValue from './FilterNumberValue';

const Table = () => {
  const { planets, filter, planetsFiltered, setPlanetsFiltered } = useContext(myContext);

  const theadTr = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  // console.log('planets', planets);

  useEffect(() => {
    const { filterByName: { name } } = filter;
    const filterPlanetsName = planets.filter((planet) => (
      planet.name.includes(name)
    ));
    setPlanetsFiltered(filterPlanetsName);
  }, [filter, planets, setPlanetsFiltered]);

  // console.log('planetsFiltered', planetsFiltered);
  return (

    (planets.length && (
      <div>
        <FilterSearch />
        <FilterNumberValue />
        <table>
          <thead>
            <tr>
              {theadTr.map((item) => <th key={ item }>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {planetsFiltered.map((item, index) => (
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

      </div>
    )
    )
  );
};
export default Table;
