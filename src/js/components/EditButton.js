import React from 'react';

export default function EditButton(props) {
    let type = {};
    switch (props.type) {
        case 'save':
            type = { icon: 'fas fa-check', color: 'darkgreen'};
            break;
        case 'cancel':
            type = { icon: 'fas fa-times', color: 'darkred'};
            break;
        default:
            type = { icon: 'fas fa-edit', color: '#3c3c3c'};
            break;
    }

    return (
        <button onClick={props.click}>
            <i className={type.icon} style={{ color: type.color }}></i>
        </button>
    );
}
