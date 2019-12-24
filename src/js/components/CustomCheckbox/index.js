import React from 'react';
import './index.css';

export default function CustomCheckbox(props) {
    return (
        <div className='custom-checkbox'>
            <input
                id={'check-' + props.id}
                type='checkbox'
                name='done'
                checked={props.checked}
                onChange={e => props.toggle(e.target.checked)}
            />
            <label htmlFor={'check-' + props.id}>
                <span></span>
            </label>
        </div>
    );
}
