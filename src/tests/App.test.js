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
    expect(fetch).toHaveBeenCalled()
    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
 
    userEvent.click(column)
    userEvent.click(screen.getByRole('option', {name:'population'}))

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 01000000/i)
    expect( screen.queryAllByRole('row')).toHaveLength(7)

    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });

  });
  test('0.Verificando os filtros', async () => {
    expect(fetch).toHaveBeenCalled()
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

  test('1.Verificando os filtros', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const column = screen.getByTestId('column-filter');
    const comparison =screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });

    userEvent.type(value, '1000000')
    userEvent.click(btnFilter);

    expect(screen.getByText(/0/i)).toBeInTheDocument();

  });

  test('2.Verificando os filtros', async () => {
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
    userEvent.click(screen.getByRole('option', {name:'rotation_period'}))

    userEvent.click(comparison)
    userEvent.click(screen.getByRole('option', {name: 'menor que'}))

    userEvent.type(value, '20')
    userEvent.click(btnFilter)
    screen.queryByText(/population menor que 020/i)
    expect( screen.queryAllByRole('row')).toHaveLength(3)
  });



  test('3.Verificando os filtros', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)
  

    const column = screen.getByTestId('column-filter');
    expect(column.length).toBe(5)
    userEvent.click(column)
    userEvent.click(screen.queryByRole('option', {name: 'surface_water'}))
    
    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "menor que"} });
  
    const btnFiltrar = screen.getByTestId('button-filter');
    userEvent.click(btnFiltrar);
    expect(column.length).toBe(5)
  });

  });
  