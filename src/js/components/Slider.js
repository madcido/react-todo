import React from 'react';
import Project from './Project';

export default function Slider({ data, actions }) {
    return (
        <React.Fragment>
            <PrevButton />
            <NextButton />
            <div
                className='projects'
                onMouseDown={e => holdSlider(e)}
                onMouseLeave={() => unholdSlider()}
                onMouseUp={() => unholdSlider()}
                onMouseMove={e => dragSlider(e)}
            >
                {data.map(project => (
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

function PrevButton() {
    return (
        <i className='fas fa-arrow-left prev-btn' onClick={() => plusSlider(-1)}></i>
    );
}

function NextButton() {
    return (
        <i className='fas fa-arrow-right next-btn' onClick={() => plusSlider(1)}></i>
    );
}

function plusSlider(n) {
    const projectsDiv = document.querySelector('.projects');
    let target;
    let remainder = projectsDiv.scrollLeft%342
    if (remainder == 0) {
        target = projectsDiv.scrollLeft + 342 * n;
    } else {
        target = projectsDiv.scrollLeft + 342 * Math.max(0, n) - remainder;
    }

    let prev = 0;
    var id = setInterval(frame, 10);
    function frame() {
        let current = projectsDiv.scrollLeft;
        projectsDiv.scrollLeft += (19 * n);
        if(projectsDiv.scrollLeft == prev) {
            clearInterval(id);
        } else {
            prev = current;
        }

        if(n > 0) {
            if (projectsDiv.scrollLeft >= target) {
                projectsDiv.scrollLeft = target;
                clearInterval(id);
            }
        } else {
            if (projectsDiv.scrollLeft <= target) {
                projectsDiv.scrollLeft = target;
                clearInterval(id);
            }
        }
    }
}

let isDown = false;
let startX;
let scrollLeft;

function holdSlider(e) {
    const projectsDiv = document.querySelector('.projects');
    isDown = true;
    startX = e.pageX - projectsDiv.offsetLeft;
    scrollLeft = projectsDiv.scrollLeft;
}

function unholdSlider() {
    isDown = false;
}

function dragSlider(e) {
    const projectsDiv = document.querySelector('.projects');
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectsDiv.offsetLeft;
    const walk = (x - startX) * 1;
    projectsDiv.scrollLeft = scrollLeft - walk;
}
