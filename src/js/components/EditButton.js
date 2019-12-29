import React from 'react';

export default function EditButton(props) {
    return (
        <button onClick={props.click}>
            <i className={props.icon} style={{ color: props.color }}></i>
        </button>
    );
}
