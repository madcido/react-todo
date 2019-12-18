import React from 'react';

const priorityColors = ['LightBlue', 'khaki', 'LightCoral'];

export default function PriorityBullet(props) {
    const priorityColor = priorityColors[props.priority];

    return (
        <span className='priority-bullet' style={{backgroundColor: priorityColor}}></span>
    );
}
