import React, { useState, useCallback, useEffect } from 'react';
import { Giraffe } from './Giraffe/Giraffe';
import { Scale } from '../../Scale/Scale';
import { Updates } from '../../Updates/Updates';
import { useHttp } from '../../../hooks/http.hook';
import { useParams } from 'react-router-dom';

import './Giraffes.css';

export const Giraffes = () => {
    const [giraffes, setGiraffes] = useState([]);
    const [showUpdates, setShowUpdates] = useState(false);
    const request = useHttp();
    const aviaryId = useParams().id;

    const getGiraffes = useCallback(async () => {
        try {
            const data = await request(`/api/giraffes/giraffes/${aviaryId}`, 'GET', null, {});
            setGiraffes(data);
        } catch (err) {}
    }, [request, aviaryId]);

    const giraffeCreateHandler = async () => {
        try {
            await request('/api/giraffes/create', 'POST', { id: aviaryId }, {});
            await request('/api/updates/create', 'POST', { action: 'Добавление', giraffe: '', id: aviaryId }, {});
            setShowUpdates(true);
        } catch (err) {}
    }

    const giraffeDeleteHandler = async (id, name) => {
        try {
            await request('/api/giraffes/delete', 'DELETE', { id }, {});
            await request('/api/updates/create', 'POST', { action: 'Удаление', giraffe: name, id: aviaryId }, {});
        } catch (err) {}
    }

    useEffect(() => {
        getGiraffes();
    }, [getGiraffes, giraffes]);
    
    return (
        <div className='Giraffes'>
            <div className='Giraffes__title'>
                <span>Жирафы</span>
                <button onClick={giraffeCreateHandler} >+</button>
            </div>
            <div className='Giraffes__items'>
                {
                    giraffes.map((giraffe, index) => {
                        return (
                            <Giraffe 
                            key={index}
                            giraffe={giraffe}
                            onDelete={giraffeDeleteHandler}
                            aviaryId={aviaryId}
                            setShowUpdates={setShowUpdates}
                        />
                        )
                    })
                }
            </div>
            <Updates showUpdates={showUpdates} setShowUpdates={setShowUpdates} aviaryId={aviaryId} />
            <Scale giraffes={giraffes} setShowUpdates={setShowUpdates} />
        </div>
    )
}