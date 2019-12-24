import React from 'react';

const priorityColors = ['LightBlue', 'khaki', 'LightCoral'];

export default function PriorityBullet({ value }) {
    const priorityColor = priorityColors[value];

    return (
        <span className='priority-bullet' style={{backgroundColor: priorityColor}}></span>
    );
}
