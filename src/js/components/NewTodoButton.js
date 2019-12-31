import React from 'react';
import Swal from 'sweetalert2';
import { getUniqueId } from '../LocalStorage';

export default function NewTodoButton(props) {
    function newTodo() {
        props.click({
            id: getUniqueId('todo'),
            title: '',
            description: '',
            priority: 2,
            done: false,
            newTodo: true,
        });
    }

    return (
        <button onClick={newTodo}>
            <i className='far fa-plus-square'></i>
        </button>
    );
}
