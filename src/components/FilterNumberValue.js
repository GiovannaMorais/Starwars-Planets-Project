import React, { useContext, useState } from 'react';
import myContext from '../context/myContext';

const FilterNumberValue = () => {
  const { setFilter,
    filter,
    planetsFiltered,
    setPlanets,
    // columns,
    // setColumns,
  } = useContext(myContext);

  const [valueColumn, setValueColumn] = useState('population');
  const [valueComparison, setValueComparison] = useState('maior que');
  const [valueNumeric, setValueNumeric] = useState('0');
  const [columns, setColumns] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  // console.log('colunas', columns);
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
    // console.log('valueCollumn', valueColumn);
    setPlanets(FilterNumber);
    const notRepeatFilters = columns.filter((column) => column !== valueColumn);
    // console.log('colluns2', valueColumn);
    setColumns(notRepeatFilters);
    // setColumns(notRepeatFilters.reverse);
    setValueColumn(notRepeatFilters);
    // console.log(notRepeatFilters);
  };

  return (
    <div>
      <label htmlFor="valueColumn">
        <select
          name="valueColumn"
          id="valueColumn"
          // value={ test }
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setValueColumn(value) }
          onClick={ ({ target: { value } }) => setValueColumn(value) }
        >
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}

          {columns.map((item) => (
            <option key={ item } value={ item }>{ item }</option>
          )) }
        </select>
      </label>
      <label htmlFor="valueComparison">
        <select
          name="valueComparison"
          id="valueComparison"
          // value={ valueComparison }
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
        // name="Filtrar"
        // id="Filtrar"
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </div>
  );
};
export default FilterNumberValue;
