import React, { useCallback, useContext, useState, useEffect } from 'react';
import myContext from '../context/myContext';

const FilterNumberValue = () => {
  const { setFilter,
    filter,
    planetsFiltered,
    setPlanets,
    // planets,
    allPlanets,
  } = useContext(myContext);

  const [valueColumn, setValueColumn] = useState('population');
  const [valueComparison, setValueComparison] = useState('maior que');
  const [valueNumeric, setValueNumeric] = useState('0');
  const [columns, setColumns] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const handleClick = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        ...filter.filterByNumericValues,
        { valueColumn, valueComparison, valueNumeric }],
    });
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
    const notRepeatFilters = columns.filter((column) => column !== valueColumn);
    setColumns(notRepeatFilters);

    // setValueColumn(notRepeatFilters);
  };

  const applyFilters = useCallback(() => {
    // console.log('filter.filterByNumericValues', filter.filterByNumericValues);
    // console.log('planets', planets);
    // console.log('allPlanets', allPlanets);
    const FilterNumber = allPlanets
      .filter((planeta) => filter.filterByNumericValues.every((filters) => {
        if (filters.valueComparison === 'maior que') {
          return Number(planeta[filters.valueColumn]) > Number(filters.valueNumeric);
        }
        if (filters.valueComparison === 'menor que') {
          return Number(planeta[filters.valueColumn]) < Number(filters.valueNumeric);
        }
        if (filters.valueComparison === 'igual a') {
          return Number(planeta[filters.valueColumn]) === Number(filters.valueNumeric);
        }
        return null;
      }));
    // console.log('FilterNumber', FilterNumber);
    setPlanets(FilterNumber);
  }, [filter.filterByNumericValues, allPlanets, setPlanets]);

  const removeFilter = ({ target: { value } }) => {
    const { filterByName: { name }, filterByNumericValues } = filter;
    setColumns([...columns, value]);
    const refresh = filterByNumericValues
      .filter((filters) => filters.valueColumn !== value);
    // console.log('refresh', filter.filterByNumericValues);
    // console.log('planetsFiltered', planetsFiltered);
    // console.log('setFilter', filter);
    setFilter({
      filterByName: { name },
      filterByNumericValues: refresh,
    });
  };

  useEffect(() => { applyFilters(); }, [applyFilters]);
  const removeAllFilters = () => {
    setFilter({ ...filter, filterByNumericValues: [] });
    // console.log('test2', filter.filterByNumericValues);
    // setPlanets(planetsFiltered);
  };

  return (
    <div>
      <label htmlFor="valueColumn">
        <select
          name="valueColumn"
          id="valueColumn"
          data-testid="column-filter"
          onClick={ ({ target: { value } }) => setValueColumn(value) }
        >

          {columns.map((item) => (
            <option key={ item } value={ item }>{ item }</option>
          )) }
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
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <div>
        {filter.filterByNumericValues && filter.filterByNumericValues.map((item, i) => (
          <div data-testid="filter" key={ i }>
            {item.valueColumn}
            {' '}
            {item.valueComparison}
            {' '}
            {item.valueNumeric}
            <button
              type="button"
              value={ item.valueColumn }
              data-testid="remove"
              onClick={ removeFilter }
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover Todos
      </button>
    </div>

  );
};
export default FilterNumberValue;
