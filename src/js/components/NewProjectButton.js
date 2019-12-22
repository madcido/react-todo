import React from 'react';
import Swal from 'sweetalert2';
import { getUniqueId } from '../LocalStorage';

export default function NewProjectButton(props) {
    function newProjectForm() {
        Swal.fire({
            html:
            `<input id='new-project-title' class='swal2-input' placeholder='Title'>`
            ,
            focusConfirm: false,
            confirmButtonText: 'Add Project',
            preConfirm: () => {
                props.click({
                    id: getUniqueId('project'),
                    title: document.getElementById('new-project-title').value,
                    todos: [],
                });
            },
        });
    }

    return (
        <button className='new-project-btn' onClick={() => newProjectForm()}>New Project</button>
    );
}
