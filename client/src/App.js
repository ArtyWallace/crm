import React from 'react';
import { Wrapper } from './components/Wrapper/Wrapper';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import { AviaryHeader } from './components/Aviary/AviaryHeader/AviaryHeader';
import { Aviary } from './components/Aviary/Aviary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Wrapper>
          <Route path='/giraffes'>
            <AviaryHeader />
            <Aviary />
          </Route>
        <Route path='/' exact>
          <h1>Main Page</h1>
        </Route>
        </Wrapper>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
