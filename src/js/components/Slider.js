import React, { useState, useEffect } from 'react';
import Project from './Project';

export default function Slider({ data, actions }) {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(0);

    function dataToDisplay() {
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
    }

    function displayBySize() {
        if (window.innerWidth < 720) {
          setDisplay(1);
      } else if (window.innerWidth < 1080) {
          setDisplay(2);
        } else {
          setDisplay(3);
        }
    };

    function slide(direction) {
        const nextIndex = (data.length + index + direction)%data.length;
        setIndex(nextIndex);
    };

    useEffect(() => {
        displayBySize();
        window.addEventListener('resize', displayBySize);
        return () => window.removeEventListener('resize', displayBySize);
    });

    return (
        <React.Fragment>
            <i className='fas fa-arrow-left prev-btn' onClick={() => slide(-1)}></i>
            <i className='fas fa-arrow-right next-btn' onClick={() => slide(1)}></i>
            <div className='projects'>
            {dataToDisplay().map(project => (
                <Project {...project}
                    key={project.id}
                    update={actions.update}
                    destroy={() => actions.destroy(project.id)}
                />
            ))}
            </div>
        </React.Fragment>
    );
}
