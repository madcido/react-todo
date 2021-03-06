import React, { useState } from 'react';
import PriorityBullet from './PriorityBullet';
import CustomCheckbox from './CustomCheckbox';
import SelectField from './SelectField';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';

export default function Todo({ id, ...props }) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [priority, setPriority] = useState(props.priority);

    function saveEdit() {
        props.update({ title, description, priority, newTodo: false });
        setEdit(false);
    }

    function cancelEdit() {
        if (props.newTodo) {
            props.update({ newTodo: false });
        }
        setTitle(props.title);
        setDescription(props.description);
        setPriority(props.priority);
        setEdit(false);
    }

    return (
        <div className='todo-block' id={'todo-' + id}>
        {(edit || props.newTodo) ?
            <>
                <div className='todo-header'>
                    <SelectField
                        value={priority}
                        handleChange={setPriority}
                        options={[0, 1, 2]}
                    />
                    <input
                        className='todo-title'
                        name='title'
                        value={title}
                        placeholder='Title'
                        onChange={e => setTitle(e.target.value)}
                        autoFocus={true}
                        onFocus={e => e.target.select()}
                    />
                </div>
                <div id={'todo-content-' + id}>
                    <textarea
                        className='todo-description'
                        name='description'
                        value={description}
                        placeholder='Add some notes...'
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <div className='todo-actions'>
                        <EditButton type='save' click={saveEdit} />
                        <EditButton type='cancel' click={cancelEdit} />
                    </div>
                </div>
            </>
            :
            <>
                <div className='todo-header'>
                    <button onClick={() => setOpen(!open)}>
                        <PriorityBullet value={priority} />
                        <p className='todo-title'>{title}</p>
                    </button>
                    <CustomCheckbox id={id} checked={props.done} toggle={done => props.update({ done })} />
                </div>
                {open &&
                <div id={'todo-content-' + id}>
                    <p className='todo-description'>{description}</p>
                    <div className='todo-actions'>
                        <EditButton click={() => setEdit(true)} />
                        <RemoveButton click={props.delete} />
                    </div>
                </div>
                }
            </>
        }
        </div>
    );
}
