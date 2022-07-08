import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const FilterNumberValue = () => {
  const { setFilter, filter, planetsFiltered, setPlanets } = useContext(myContext);

  const [valueColumn, setValueColumn] = useState('population');
  const [valueComparison, setValueComparison] = useState('maior que');
  const [valueNumeric, setValueNumeric] = useState('0');

  //   console.log(filter);
  const handleClick = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        { valueColumn, valueComparison, valueNumeric }],
    });
    // console.log('planetsFiltered', planetsFiltered);
    const FilterNumber = planetsFiltered.filter((planeta) => {
      if (valueComparison === 'maior que') {
        return Number(planeta[valueColumn]) > Number(valueNumeric);
      }
      if (valueComparison === 'menor que') {
        return Number(planeta[valueColumn]) < Number(valueNumeric);
      }
      if (valueComparison === 'igual a') {
        return Number(planeta[valueColumn]) === Number(valueNumeric);
      }
      return null;
    });
    setPlanets(FilterNumber);
  };
  return (
    <div>
      <label htmlFor="valueColumn">
        <select
          name="valueColumn"
          id="valueColumn"
          value={ valueColumn }
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setValueColumn(value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="valueComparison">
        <select
          name="valueComparison"
          id="valueComparison"
          value={ valueComparison }
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setValueComparison(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valueNumeric">
        <input
          name="valueNumeric"
          id="valueNumeric"
          type="text"
          data-testid="value-filter"
          value={ valueNumeric }
          onChange={ ({ target: { value } }) => setValueNumeric(value) }
        />
      </label>
      <button
        name="Filtrar"
        id="Filtrar"
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>

    </div>
  );
};
export default FilterNumberValue;
