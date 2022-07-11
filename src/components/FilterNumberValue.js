import React, { useContext, useState,
  useEffect, useCallback,
} from 'react';
import myContext from '../context/myContext';

const FilterNumberValue = () => {
  const { setFilter,
    filter,
    planetsFiltered,
    setPlanets,
    sort,
    setSort,
    column,
    setColumn,
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
    const notRepeatFilters = columns.filter((coluna) => coluna !== valueColumn);
    setColumns(notRepeatFilters);
  };

  const applyFilters = useCallback(() => {
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
    setPlanets(FilterNumber);
  }, [filter.filterByNumericValues, allPlanets, setPlanets]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const removeFilter = ({ target: { value } }) => {
    const { filterByName: { name }, filterByNumericValues } = filter;
    setColumns([...columns, value]);
    const refresh = filterByNumericValues
      .filter((filters) => filters.valueColumn !== value);
    setFilter({
      filterByName: { name },
      filterByNumericValues: refresh,
    });
  };

  const removeAllFilters = () => {
    setFilter({ ...filter, filterByNumericValues: [] });
  };
  const handleSortClick = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [
        ...filter.filterByNumericValues,
      ],
      order: {
        column,
        sort,
      },

    });
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
        Remover todas filtragens
      </button>
      <div>
        <label htmlFor="order">
          <select
            name="order"
            id="order"
            data-testid="column-sort"
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            <option value="rotation_period">rotation_period</option>
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="radio-asc">
          Ascendente
          <input
            type="radio"
            name="radio-order"
            id="radio-asc"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ ({ target: { value } }) => { setSort(value); } }
          />
        </label>
        <label htmlFor="radio-desc">
          Descendente
          <input
            type="radio"
            name="radio-order"
            id="radio-desc"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ ({ target: { value } }) => { setSort(value); } }
          />
        </label>
        <button
          name="Filtrar"
          id="Filtrar"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleSortClick() }
        >
          Ordenar
        </button>
      </div>
    </div>

  );
};
export default FilterNumberValue;
