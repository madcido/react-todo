import React from 'react';
import Swal from 'sweetalert2';
import { getUniqueId } from '../LocalStorage';

export default function NewTodoButton(props) {
    function newTodoForm() {
        Swal.fire({
            html:
            `<input id='new-todo-title' class='swal2-input' placeholder='Title'>
            <input id='new-todo-description' class='swal2-input' placeholder='Description'>
            <select id='new-todo-priority' class='swal2-input'>
            <option value='0' selected>Low Priority</option>
            <option value='1'>Medium Priority</option>
            <option value='2'>High Priority</option>
            </select>
            `,
            focusConfirm: false,
            confirmButtonText: 'Add To-do',
            preConfirm: () => {
                props.click({
                    id: getUniqueId('todo'),
                    title: document.getElementById('new-todo-title').value,
                    description: document.getElementById('new-todo-description').value || "Add some notes...",
                    priority: document.getElementById('new-todo-priority').value,
                    done: false,
                });
            },
        });
    }

    return (
        <i className='far fa-plus-square' onClick={() => newTodoForm()}></i>
    );
}
