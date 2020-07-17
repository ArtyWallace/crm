import React from 'react';
import './Wrapper.css';

export const Wrapper = props => {
    return (
        <div className='Wrapper'>
            { props.children }
        </div>
    )
}