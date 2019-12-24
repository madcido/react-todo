import React, { useState, useEffect, useRef } from 'react';
import Todo from './Todo';
import CustomScroll from './CustomScroll';
import NewTodoButton from './NewTodoButton';
import RemoveButton from './RemoveButton';

export default function Project({ id, ...props }) {
    const [todos, setTodos] = useState(props.todos);
    const [title, setTitle] = useState(props.title);
    const [editTitle, setEditTitle] = useState(false);

    useEffect(() => props.update({ id, title, todos }), [title, todos]);

    function createTodo(newTodo) {
        setTodos([newTodo, ...todos]);
    }

    function updateTodo(values) {
        let i = todos.findIndex(todo => todo.id === this.id);
        let todosCopy = [...todos];
        todosCopy[i] = { ...todosCopy[i], ...values };
        setTodos(todosCopy);
    }

    function destroyTodo() {
        let i = todos.findIndex(todo => todo.id === this.id);
        let todosCopy = [...todos];
        todosCopy.splice(i, 1);
        setTodos(todosCopy);
    }

    return (
        <div className='project-card' id={'project-' + id}>
            <div className='header'>
            {editTitle ?
                <input
                    className='project-title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={() => setEditTitle(false)}
                    autoFocus
                />
                :
                <h2 className='project-title' onClick={() => setEditTitle(true)}>{title}</h2>
            }
                <NewTodoButton click={createTodo} />
                <RemoveButton click={props.destroy} />
            </div>
            <div className='content'>
                <CustomScroll />
                {todos.map(todo => (
                    <Todo {...todo}
                        key={todo.id}
                        update={updateTodo.bind(todo)}
                        destroy={destroyTodo.bind(todo)}
                    />
                ))}
            </div>
        </div>
    );
}
