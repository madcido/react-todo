import React, { useState, useEffect } from 'react';
import PriorityBullet from './PriorityBullet';
import DoneCheckbox from './DoneCheckbox';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';

export default function Todo({ id, ...props }) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [priority, setPriority] = useState(props.priority);
    const [done, setDone] = useState(props.done);

    useEffect(() => props.update({ title, description, priority, done }), [edit, done]);

    return (
        <div className='todo-block' id={'todo-' + id}>
        {edit ?
            <>
                <div className='header'>
                    <input
                        className='titleInput'
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div id={'todo-content-' + id}>
                    <textarea
                        className='description'
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <RemoveButton click={() => props.destroy()} />
                    <EditButton
                        icon='fas fa-check-double'
                        color='darkgreen'
                        click={() => setEdit(false)}
                    />
                </div>
            </>
            :
            <>
                <div className='header'>
                    <p onClick={() => setOpen(!open)}>
                        <PriorityBullet priority={priority} />
                        <span className='todo-title'>{title}</span>
                    </p>
                    <DoneCheckbox id={id} checked={done} toggle={setDone} />
                </div>
                {open &&
                <div id={'todo-content-' + id}>
                    <p className='description'>{description}</p>
                    <RemoveButton click={() => props.destroy(id)} />
                    <EditButton
                        icon='fas fa-edit'
                        color='#3c3c3c'
                        click={() => setEdit(true)}
                    />
                </div>
                }
            </>
        }
        </div>
    );
}
