import React, { useState, useEffect } from 'react';
import Project from './Project';

export default function Slider({ data }) {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(1);

    const dataToDisplay = (() => {
          const toDisplay = [];
          let i = index;
          while (toDisplay.length < Math.min(data.length, display)) {
                toDisplay.push(data[i]);
                i += 1;
                if (i > data.length - 1) {
                    i = 0;
                }
          }
          return toDisplay;
    })();

    function displayBySize() {
        if (window.innerWidth < 1180) {
          setDisplay(1);
        } else {
          setDisplay(3);
        }
    };

    function slide(direction) {
        const toIndex = (data.length + index + direction)%data.length;
        setIndex(toIndex);
    };

    useEffect(() => {
        displayBySize();
        window.addEventListener('resize', displayBySize);
        return () => window.removeEventListener('resize', displayBySize);
    });

    useEffect(() => {
        setIndex(0);
    }, [data]);

    return (
        <React.Fragment>
            <i className='fas fa-arrow-left slider-prev-btn' onClick={() => slide(-1)}></i>
            <i className='fas fa-arrow-right slider-next-btn' onClick={() => slide(1)}></i>
            <div className='slider-bullets'>
            {data.map((project, i) => (
                <div key={project.id} className={index === i ? 'selected' : null} onClick={() => setIndex(i)}>
                    <span>{project.title}</span>
                </div>
            ))}
            </div>
            <div className='slider-display'>
            {dataToDisplay.map(project => (
                <Project key={project.id} {...project} />
            ))}
            </div>
        </React.Fragment>
    );
}
