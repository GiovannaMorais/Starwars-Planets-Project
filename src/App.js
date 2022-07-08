import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <h1>Starwars Planets</h1>
      <Provider>
        <Table />
      </Provider>
    </div>
  );
}

export default App;
