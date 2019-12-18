import React, { useState } from 'react';
import PriorityBullet from "./PriorityBullet";
import DoneCheckbox from "./DoneCheckbox";
import RemoveButton from "./RemoveButton";

export default function Todo({ id, title, description, priority, done, ...props}) {
    const todo = { id, title, description, priority, done };
    const [open, setOpen] = useState(false);

    function handleChange(key, value) {
        props.update({
            ...todo,
            [key]: value
        });
    }

    return (
        <div className='todo-block' id={'todo-' + id}>
            <div className='header'>
                <p onClick={() => setOpen(!open)}>
                    <PriorityBullet priority={priority} />
                    <span>{title}</span>
                </p>
                <DoneCheckbox id={id} checked={done} toggle={handleChange} />
            </div>
            {open &&
                <div id={'todo-content-' + id}>
                    <textarea
                        name='description'
                        value={description}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                    ></textarea>
                    <RemoveButton click={() => props.destroy(id)} />
                </div>
            }
        </div>
    );
}
