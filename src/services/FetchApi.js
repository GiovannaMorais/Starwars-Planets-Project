const src = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApi = async () => {
  const response = await fetch(src);
  const json = await response.json();
  return json;
};

export default fetchApi;
