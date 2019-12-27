import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { getUniqueId } from '../LocalStorage';
import Dispatch from '../reducer';

export default function NewProjectButton() {
    const dispatch = useContext(Dispatch);

    function newProjectForm() {
        Swal.fire({
            html:
            `<input id='new-project-title' class='swal2-input' placeholder='Title'>`
            ,
            focusConfirm: false,
            confirmButtonText: 'Add Project',
            preConfirm: () => {
                dispatch({
                    type: 'ADD_PROJECT',
                    payload: {
                        id: getUniqueId('project'),
                        title: document.getElementById('new-project-title').value,
                        todos: [],
                    },
                });
            },
        });
    }

    return (
        <button className='new-project-btn' onClick={() => newProjectForm()}>New Project</button>
    );
}
