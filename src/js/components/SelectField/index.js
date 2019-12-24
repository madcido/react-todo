import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import PriorityBullet from '../PriorityBullet';

export default function SelectField(props) {
    const selectBox = useRef();
    const [open, setOpen] = useState(false);
    const selected = open ? 'select-selected select-active' : 'select-selected';
    const items = open ? 'select-items' : 'select-items select-hide';

    const closeSelectBoxes = e => {
        if (selectBox.current && !selectBox.current.contains(e.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeSelectBoxes);
        return () => document.removeEventListener('click', closeSelectBoxes);
    });

    return (
        <div className='custom-select'>
            <div ref={selectBox} className={selected} onClick={() => setOpen(!open)}>
                <PriorityBullet value={props.value} />
            </div>
            <div className={items}>
                {props.options.map((opt, i) => (
                    <div key={i} onClick={() => props.handleChange(opt)}>
                        <PriorityBullet value={opt} />
                    </div>
                ))}
            </div>
        </div>
    );
}
