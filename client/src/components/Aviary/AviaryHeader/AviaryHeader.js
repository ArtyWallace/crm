import React, { useCallback, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import avatar from '../../../assets/img/giraffe-logo.png';
import './AviaryHeader.css';
import { useHttp } from '../../../hooks/http.hook';

export const AviaryHeader = () => {
    const request = useHttp();
    const [aviaries, setAviaries] = useState([]);

    const getAviaries = useCallback( async () => {
        try {
            const data = await request('/api/aviaries/aviaries', 'GET', null, {});
            setAviaries(data);
        } catch (err) {}
    }, [request]);

    useEffect(() => {
        getAviaries();
    }, [getAviaries, aviaries]);

    const aviaryCreateHandler = async () => {
        try {
            await request('/api/aviaries/create', 'POST', { title: `Вольер ${aviaries.length + 1}` }, {});
        } catch (err) {}
    }

    return (
        <div className='AviaryHeader'>
            <div className='AviaryHeader__nav'>
                {
                    aviaries.map((aviary, index) => {
                        return (
                            <NavLink 
                                key={index}
                                to={`/giraffes/${aviary._id}`}
                                activeClassName='active'
                                className='AviaryHeader__nav-link'
                            >{ aviary.title }</NavLink>
                        )
                    })
                }
                <i className='fa fa-plus' onClick={aviaryCreateHandler}/>
            </div>
            <div className='AviaryHeader__info'>
                <i className='far fa-bell'></i>
                <img src={avatar} alt='avatar' className='AviaryHeader__info-avatar'/>
                <span>hello@giraffe.com</span>
            </div>
        </div>
    )
}