import React, { useState, useEffect } from 'react';
import { useHttp } from '../../../../hooks/http.hook';
import axios from 'axios';

import avatar from '../../../../assets/img/default-photo.png';
import './Giraffe.css';

export const Giraffe = ({ giraffe, onDelete, aviaryId, setShowUpdates }) => {
    const request = useHttp();
    const [modal, setModal] = useState(false);
    const [editButton, setEditButton] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [giraffeModel, setGiraffeModel] = useState({
        ...giraffe
    });
    const [file, setFile] = useState();
    
    const showModal = () => {
        setModal(!modal);
        if (editButton) {
            setEditButton(false);
            setModal(false);
            setEditMode(false);
        }
    }

    const editModeHandler = () => {
        setEditButton(!editButton);
        setModal(false);
        setEditMode(true);
    }

    const editGiraffeHandler = async id => {
        try {
            await request(
                '/api/giraffes/edit', 
                'PUT', 
                {
                    id,
                    name: giraffeModel.name,
                    gender: giraffeModel.gender,
                    weight: giraffeModel.weight,
                    height: giraffeModel.height,
                    color: giraffeModel.color,
                    diet: giraffeModel.diet,
                    nature: giraffeModel.nature,
                    photo: giraffeModel.photo
                },
                {}
            );
            setGiraffeModel({...giraffe});
            await request('/api/updates/create', 'POST', { action: 'Изменение', giraffe: giraffeModel.name, id: aviaryId }, {});
            giraffePhotoUploadHandler();
            setShowUpdates(true);
        } catch (err) {}
    }

    const editHandler = id => {
        editGiraffeHandler(id);
        setEditMode(false);
        setEditButton(false);
    }

    const giraffePhotoUploadHandler = async () => {
        try {
            // debugger;
            let formData = new FormData();
            formData.append('image', file[0]);
            const { data } = await axios.post('/api/uploads/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setFile(data);
        } catch (err) {}
    }

    useEffect(() => {
        console.log(file);
    }, [file]);

    const deleteHandler = (id, name) => {
        onDelete(id, name);
        setModal(false);
        setShowUpdates(true);
    }

    return (
        <div className={editButton ? 'Giraffe selected' : 'Giraffe'}>
            {
                modal
                ? (
                    <div className='Modal'>
                        <div className='Modal__item' onClick={editModeHandler}>
                            <i className='fa fa-pencil-alt'/>
                        Редактировать</div>
                        <div className='Modal__item' onClick={() => deleteHandler(giraffe._id, giraffe.name)}>
                            <i className='fa fa-trash-alt'/>
                        Удалить</div>
                    </div>
                )
                : null
            }
            <div className='Giraffe__menu' onClick={showModal}>
                <i className="fas fa-ellipsis-h"></i>
            </div>
            {
                editMode
                ? ( <>
                        <img src={ !file ? avatar : giraffe.photo } alt='avatar' />
                        <input type='file' onChange={event => setFile(event.target.files)} />
                        <input 
                            value={ giraffeModel.name } 
                            onChange={event => setGiraffeModel({...giraffeModel, name: event.target.value})} 
                            className='Giraffe__name input' 
                        />
                        <div className='Giraffe__info-icons'>
                            <i className='fa fa-venus-mars'></i>
                            <i className='fa fa-balance-scale'></i>
                            <i className='fa fa-ruler-vertical'></i>
                        </div>
                        <div className='Giraffe__info-description'>
                            <span><input 
                                value={ giraffeModel.gender } 
                                onChange={event => setGiraffeModel({...giraffeModel, gender: event.target.value})} 
                                className="input" 
                            /></span>
                            <span><input 
                                value={ giraffeModel.weight } 
                                onChange={event => setGiraffeModel({...giraffeModel, weight: event.target.value})} 
                                className="input" 
                            /></span>
                            <span><input 
                                value={ giraffeModel.height } 
                                onChange={event => setGiraffeModel({...giraffeModel, height: event.target.value})} 
                                className="input" 
                            /></span>
                        </div>
                        <div className='Giraffe__info-details'>
                            <div>Цвет: <span><input 
                                value={giraffeModel.color} 
                                onChange={event => setGiraffeModel({...giraffeModel, color: event.target.value})} 
                                className='input' 
                            /></span></div>
                            <div>Диета: <span><input 
                                value={giraffeModel.diet} 
                                onChange={event => setGiraffeModel({...giraffeModel, diet: event.target.value})} 
                                className='input' 
                            /></span></div>
                            <div>Характер: <span><input 
                                value={giraffeModel.nature} 
                                onChange={event => setGiraffeModel({...giraffeModel, nature: event.target.value})} 
                                className='input' 
                            /></span></div>
                        </div>
                    </>

                )
                : ( <>
                        <img src={ !giraffe.photo ? avatar : giraffe.photo } alt='avatar' />
                        <span className='Giraffe__name'>{giraffe.name}</span>
                        <div className='Giraffe__info-icons'>
                            <i className='fa fa-venus-mars'></i>
                            <i className='fa fa-balance-scale'></i>
                            <i className='fa fa-ruler-vertical'></i>
                        </div>
                        <div className='Giraffe__info-description'>
                            <span>{giraffe.gender}</span>
                            <span>{giraffe.weight}</span>
                            <span>{giraffe.height}</span>
                        </div>
                        <div className='Giraffe__info-details'>
                            <div>Цвет: <span>{giraffe.color}</span></div>
                            <div>Диета: <span>{giraffe.diet}</span></div>
                            <div>Характер: <span>{giraffe.nature}</span></div>
                        </div>
                    </>
                )
            }
            
            { editButton ? <button className='editButton' onClick={() => editHandler(giraffe._id)}>Сохранить</button> : null }
        </div>
    )
}