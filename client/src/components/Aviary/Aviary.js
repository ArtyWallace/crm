import React from 'react';
import { Giraffes } from './Giraffes/Giraffes';

import './Aviary.css';
import { Route } from 'react-router-dom';

export const Aviary = () => (
    <div className='Aviary'>
    <Route path='/giraffes/:id' >
        <Giraffes />
    </Route>
    </div>
)