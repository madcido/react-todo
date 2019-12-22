import React from 'react';

export default function EditButton(props) {
    return (
        <i
            className={props.icon}
            onClick={props.click}
            style={{ color: props.color }}
        ></i>
    );
}
