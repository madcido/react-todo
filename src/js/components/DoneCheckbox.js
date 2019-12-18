import React from 'react';

export default function DoneCheckbox(props) {
    return (
        <div>
            <input
                id={'check-' + props.id}
                type='checkbox'
                name='done'
                checked={props.checked}
                onChange={e => props.toggle(e.target.name, e.target.checked)}
            />
            <label htmlFor={'check-' + props.id}>
                <span></span>
            </label>
        </div>
    );
}
