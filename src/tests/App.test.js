import React from 'react';
import { cleanup, render, screen, act,fireEvent } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import resultsApi from './resultsApi';

describe('Verifica se a pagina é reenderizada corretamente', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(resultsApi)
    })
    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  }); 
   test('Verificando se os inputs e os botões aparecem na tela', () => {
    const name = screen.getByTestId('name-filter');
   const column = screen.getByTestId('column-filter');
   const comparison =screen.getByTestId('comparison-filter')
   const value = screen.getByTestId('value-filter')
   const btnFilter = screen.getByTestId('button-filter')
   const btnRemove = screen.getByTestId('button-remove-filters')
   const table = screen.getByRole('table')
    expect(column).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(comparison).toBeInTheDocument()
    expect(value).toBeInTheDocument()
    expect(btnFilter).toBeInTheDocument()
    expect(btnRemove).toBeInTheDocument()

  });

  test('Verificando se o filtro de nome está funcionando', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)
    
    const name = screen.getByTestId('name-filter');
    userEvent.type(name, 'Alderaan')
    expect(await screen.findAllByRole('row')).toHaveLength(2)

    userEvent.type(name, 'Hoth')
    expect(await screen.findAllByRole('row')).toHaveLength(1)
  });


  test('Verificando se o filtro "menor que" está funcionando', async () => {
    const column = screen.getByTestId('column-filter');

    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
  
 
    userEvent.click(column)
    userEvent.click(screen.getAllByRole('option', {name:'population'})[0])

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 01000000/i)
    expect( screen.queryAllByRole('row')).toHaveLength(7)
   
    fireEvent.click(column)
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'surface_water' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '0' }});
    fireEvent.click(await screen.findByTestId('button-filter'));

    expect( screen.queryAllByRole('row')).toHaveLength(0);
  });

  test('Verificando o filtro "maior que"', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
 
    userEvent.click(comparison)

    userEvent.click(screen.getByRole('option', {name: /maior que/i}));

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(7)
    screen.getByText(/population maior que 01000000/i)
  });

  test('Verificando o filtro "igual a"', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    expect(screen.queryByText(/0/i)).toBeInTheDocument();

  });

  test('Verificando dois filtros com "menor que" ', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(3)

    userEvent.click(column)
    userEvent.click(screen.getAllByRole('option', {name:'rotation_period'})[0])

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))

    userEvent.type(value, '20')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 020/i)
    expect( screen.queryAllByRole('row')).toHaveLength(3)

      expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(3)
  
    expect(column.length).toBe(3)
    userEvent.click(column)
    userEvent.click(screen.getAllByRole('option', {name: 'surface_water'})[0])
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });
  
    const btnFiltrar = screen.getByTestId('button-filter');
    userEvent.click(btnFiltrar);
    expect(column.length).toBe(2)
  });

  test('Testando a função removeFilter', async () => {
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '9000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(8);
    
    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'menor que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '1000000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(2);
    
    const removeFilter = async () => {
      const btnFilter = await screen.findAllByTestId('filter');
      fireEvent.click(btnFilter[0].querySelector('button'));
    };
     await removeFilter();
    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });

  test('Testando se a ordem está correta pela column "orbital_period" em Descendente', async () => {
    
    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'orbital_period' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-desc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(item => item.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Testando se a ordem está correta pela column "diameter" em Ascendente', async () => {
    
    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'diameter' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Testando se a ordem está correta pela column "population" em Descendente', async () => {
    
    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'population' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-desc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Hoth','Dagobah'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });
  test('Testando se a ordem está correta pela column "population" em Ascendente', async () => {
    
    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'population' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));
    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV','Dagobah', 'Hoth'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets.reverse());
  });
  test('Testando se a ordem está correta pela column "surface_water" em Ascendente', async () => {
    
    fireEvent.change(await screen.findByTestId('column-sort'), { target: { value: 'surface_water ' }});
    fireEvent.click(await screen.findByTestId('column-sort-input-asc'));
    fireEvent.click(await screen.findByTestId('column-sort-button'));   
    const expectedPlanets = [ 'Tatooine','Alderaan', 'Yavin IV','Hoth','Dagobah',"Bespin","Endor",'Naboo',"Coruscant", 'Kamino'];
    const planetName = await screen.findAllByTestId('planet-name');
    const planeta = planetName.map(planet => planet.innerHTML);
    // console.log(planeta);
    expect(planeta).toEqual(expectedPlanets);
  });

  test('Testando a removeAllFilter com o todos "comparison"', async () => {
    const removeAllFilter = async () => {
      const filters =  screen.queryByTestId('button-remove-filters')
      fireEvent.click(filters)
    };
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'diameter' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'maior que' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '9000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(8);

    fireEvent.change(await screen.findByTestId('column-filter'), { target: { value: 'population' }});
    fireEvent.change(await screen.findByTestId('comparison-filter'), { target: { value: 'igual a' }});
    fireEvent.change(await screen.findByTestId('value-filter'), { target: { value: '200000' }});
    fireEvent.click(await screen.findByTestId('button-filter'));
    expect(await screen.findAllByRole('row')).toHaveLength(2);

     await removeAllFilter();
    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });


});

  