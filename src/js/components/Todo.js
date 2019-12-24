import React, { useState, useEffect } from 'react';
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
    const [done, setDone] = useState(props.done);

    useEffect(() => props.update({ title, description, priority, done }), [edit, done]);

    return (
        <div className='todo-block' id={'todo-' + id}>
        {edit ?
            <>
                <div className='header'>
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
                    />
                </div>
                <div id={'todo-content-' + id}>
                    <textarea
                        className='todo-description'
                        name='description'
                        value={description}
                        placeholder='Description'
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <RemoveButton click={() => props.destroy()} />
                    <EditButton
                        icon='fas fa-check'
                        color='darkgreen'
                        click={() => setEdit(false)}
                    />
                </div>
            </>
            :
            <>
                <div className='header'>
                    <p onClick={() => setOpen(!open)}>
                        <PriorityBullet value={priority} />
                        <span className='todo-title'>{title}</span>
                    </p>
                    <CustomCheckbox id={id} checked={done} toggle={setDone} />
                </div>
                {open &&
                <div id={'todo-content-' + id}>
                    <p className='todo-description'>{description}</p>
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
