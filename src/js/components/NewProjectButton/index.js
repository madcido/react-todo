import React, { useContext } from 'react';
import './index.css';
import { getUniqueId } from '../../LocalStorage';
import Dispatch from '../../reducer';

export default function NewProjectButton() {
    const dispatch = useContext(Dispatch);

    function newProject() {
        dispatch({
            type: 'ADD_PROJECT',
            payload: {
                id: getUniqueId('project'),
                title: '',
                todos: [],
                newProject: true,
            },
        });
    }

    return (
        <button className='new-project-btn' onClick={newProject}>
            New Project
        </button>
    );
}
