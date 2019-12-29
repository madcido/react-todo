import React from 'react';
import './index.css';

const priorityColors = ['LightBlue', 'khaki', 'LightCoral'];

export default function PriorityBullet({ value }) {
    const priorityColor = priorityColors[value];

    return (
        <span className='priority-bullet' style={{backgroundColor: priorityColor}}></span>
    );
}
