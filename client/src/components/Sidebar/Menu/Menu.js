import React from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css';

export const Menu = () => {
    return (
        <ul className='Menu'>
            <NavLink to='/'>
            <li className='Menu__item'>
                <i className="fas fa-home"></i>
                <span>Главная</span>
            </li>
            </NavLink>
            <li className='Menu__item'>
                <i className="fas fa-tasks"></i>
                <span>Управление</span>
            </li>
            <NavLink to='/giraffes'>
            <li className='Menu__item'>
                <i className="fas fa-horse-head"></i>
                <span>Жирафы</span>
            </li>
            </NavLink>
            <li className='Menu__item'>
                <i className="fas fa-user-friends"></i>
                <span>Сотрудники</span>
            </li>
            <li className='Menu__item'>
                <i className="fas fa-cog"></i>
                <span>Настройки</span>
            </li>
            <li className='Menu__item'>
                <i className="fas fa-tools"></i>
                <span>Поддержка</span>
            </li>
        </ul>
    )
}