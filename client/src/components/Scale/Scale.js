import React from 'react';
import './Scale.css';

export const Scale = ({ giraffes, setShowUpdates }) => {
    return (
        <div className='Scale'>
            <i className='fa fa-times' />
            <div className='Scale__title'>
                <span>{ `${giraffes.length * 20}%` }</span>
                <span>Заполнение вольера</span>
            </div>
            <div className='Scale__info'>
                <progress className='Scale__progress' max='100' value={giraffes.length * 20} />
                <button onClick={setShowUpdates} >Информация</button>
            </div>
        </div>
    )
}