import React from 'react';
import { Menu } from './Menu/Menu';

import logo from '../../assets/img/giraffe-logo.png';
import './Sidebar.css';

export const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <div className='Sidebar__header'>
                <img src={logo} alt='logo' />
                <div className='Sidebar__info'>
                    <div>Ферма заслуженных жирафов</div>
                    <div>России и СНГ</div>
                </div>
            </div>
            <Menu />
        </div>
    )
}