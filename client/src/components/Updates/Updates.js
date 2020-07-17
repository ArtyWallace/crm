import React, { useEffect, useState, useCallback } from 'react';
import './Updates.css';
import { useHttp } from '../../hooks/http.hook';

export const Updates = ({ showUpdates, setShowUpdates, aviaryId }) => {
    const request = useHttp();
    const [updates, setUpdates] = useState([]);

    const getUpdates = useCallback( async () => {
        try {
            const data = await request(`/api/updates/updates/${aviaryId}`, 'GET', null, {});
            setUpdates(data.updates);
        } catch (err) {}
    }, [request, aviaryId]);

    useEffect(() => {
        getUpdates();
    }, [getUpdates, updates]);

    if (showUpdates) {
        return (
            <div className='Updates'>
                <div className='Updates__title'>
                    <div>Обновления</div>
                    <i className='fa fa-times' onClick={() => setShowUpdates(false)} />
                </div>
                <table>
                    <thead>
                        <tr><th>Дата</th><th>Действие</th><th>Жираф</th><th>Статус</th></tr>
                    </thead>
                    <tbody>
                        {
                            updates.map((update, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{ update.date }</td>
                                        <td>{ update.action }</td>
                                        <td>{ update.giraffe }</td>
                                        <td><span className='Updates__status'>{ update.status }</span></td>
                                    </tr>
                                )})
                        }
                        {/* <tr><td>01 июня 2020</td><td>Добавление</td><td>Гога</td><td><span className='Updates__status'>Выполнено</span></td></tr>
                        <tr><td>01 июня 2020</td><td>Добавление</td><td>Гога</td><td><span className='Updates__status'>Выполнено</span></td></tr>
                        <tr><td>01 июня 2020</td><td>Добавление</td><td>Гога</td><td><span className='Updates__status'>Выполнено</span></td></tr>
                        <tr><td>01 июня 2020</td><td>Добавление</td><td>Гога</td><td><span className='Updates__status'>Выполнено</span></td></tr>
                        <tr><td>01 июня 2020</td><td>Добавление</td><td>Гога</td><td><span className='Updates__status'>Выполнено</span></td></tr> */}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return null;
    }
}