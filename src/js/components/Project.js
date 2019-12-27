import React, { useContext } from 'react';
import Todo from './Todo';
import CustomScroll from './CustomScroll';
import EditableText from './EditableText';
import NewTodoButton from './NewTodoButton';
import RemoveButton from './RemoveButton';
import Dispatch from '../reducer';

export default function Project({ id, title, todos }) {
    const dispatch = useContext(Dispatch);

    function updateProject(value) {
        dispatch({
            id,
            type: 'UPDATE_PROJECT',
            payload: value,
        });
    }

    function deleteProject() {
        dispatch({
            id,
            type: 'DELETE_PROJECT',
        });
    }

    function createTodo(newTodo) {
        updateProject({
            todos: [newTodo, ...todos],
        });
    }

    function updateTodo(values) {
        let i = todos.findIndex(todo => todo.id === this.id);
        let todosCopy = [...todos];
        todosCopy[i] = { ...todosCopy[i], ...values };
        updateProject({
            todos: todosCopy,
        });
    }

    function deleteTodo() {
        let i = todos.findIndex(todo => todo.id === this.id);
        let todosCopy = [...todos];
        todosCopy.splice(i, 1);
        updateProject({
            todos: todosCopy,
        });
    }

    return (
        <div className='project-card' id={'project-' + id}>
            <div className='header'>
                <EditableText
                    className='project-title'
                    value={title}
                    onChange={title => updateProject({ title })}
                />
                <NewTodoButton click={createTodo} />
                <RemoveButton click={deleteProject} />
            </div>
            <div className='content'>
                <CustomScroll />
                {todos.map(todo => (
                    <Todo {...todo}
                        key={todo.id}
                        update={updateTodo.bind(todo)}
                        delete={deleteTodo.bind(todo)}
                    />
                ))}
            </div>
        </div>
    );
}
