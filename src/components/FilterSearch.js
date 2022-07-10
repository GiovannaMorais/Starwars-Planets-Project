import React, { useContext } from 'react';
import myContext from '../context/myContext';

const FilterSearch = () => {
  const { setFilter, filter } = useContext(myContext);

  const handleChange = (name) => {
    setFilter({
      filterByName: {
        ...filter, name,
      },
      filterByNumericValues: [...filter.filterByNumericValues],
    });
  };

  return (
    <div>
      <label htmlFor="inputSearch">
        <input
          data-testid="name-filter"
          id="inputSearch"
          type="text"
          placeholder="Filtrar por nome"
          onChange={ ({ target: { value } }) => handleChange(value) }
        />
      </label>
    </div>
  );
};
export default FilterSearch;
