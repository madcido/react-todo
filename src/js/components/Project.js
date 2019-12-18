import React from 'react';
import Todo from './Todo';
import NewTodoButton from './NewTodoButton';
import RemoveButton from './RemoveButton';

export default function Project({ id, title, todos, ...props }) {
    function createTodo(newTodo) {
        props.update({
            id,
            title,
            todos: [newTodo, ...todos],
        });
    }

    function updateTodo(todo) {
        let index = todos.findIndex((t) => t.id === todo.id);
        let todosCopy = [...todos];
        todosCopy[index] = todo;
        props.update({
            id,
            title,
            todos: [...todosCopy],
        });
    }

    function destroyTodo(todoId) {
        let index = todos.findIndex((t) => t.id === todoId);
        let todosCopy = [...todos];
        todosCopy.splice(index, 1);
        props.update({
            id,
            title,
            todos: [...todosCopy],
        });
    }

    return (
        <div className='project-card' id={'project-' + id}>
            <div className='header'>
                <h2>{title}</h2>
                <NewTodoButton click={createTodo} />
                <RemoveButton click={() => props.destroy(id)} />
            </div>
            <div className='content'>
                {todos.map((todo, index) => (
                    <Todo key={index} {...todo} update={updateTodo} destroy={destroyTodo} />
                ))}
            </div>
        </div>
    );
}
