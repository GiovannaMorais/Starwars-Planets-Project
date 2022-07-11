import React, { useContext, useEffect } from 'react';
import myContext from '../context/myContext';
import FilterSearch from './FilterSearch';
import FilterNumberValue from './FilterNumberValue';

const Table = () => {
  const { planets, filter, planetsFiltered,
    setPlanetsFiltered, column, sort } = useContext(myContext);

  const theadTr = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const SortCompared = ((a, b) => {
    if (column === 'name' && column !== '') {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return '-1';
      }
    }

    if (sort === 'ASC') {
      const columnA = a[column] === 'unknown';
      const columnB = b[column] === 'unknown';
      const valueA = columnA ? null : a[column];
      const valueB = columnB ? null : b[column];
      return valueA - valueB;
    }

    if (sort === 'DESC') {
      const columnA = a[column] === 'unknown';
      const columnB = b[column] === 'unknown';
      const valueA = columnA ? null : a[column];
      const valueB = columnB ? null : b[column];
      return valueB - valueA;
    }
  });

  useEffect(() => {
    const { filterByName: { name } } = filter;

    const filterPlanetsName = planets.filter((planet) => (
      planet.name.includes(name)));

    if (sort === 'ASC') {
      setPlanetsFiltered(filterPlanetsName.sort(SortCompared));
    } else if (sort === 'DESC') {
      setPlanetsFiltered(planets.sort(SortCompared));
    } else {
      setPlanetsFiltered(filterPlanetsName);
    }
  }, [filter, planets, setPlanetsFiltered, sort]);

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
                <td data-testid="planet-name">{item.name}</td>
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
