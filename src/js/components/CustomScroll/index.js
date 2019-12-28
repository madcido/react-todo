import React, { useState, useRef, useEffect } from 'react';
import './index.css';

export default function CustomScroll(props) {
    const [ignore, forceUpdate] = useState();
    const [display, setDisplay] = useState('none');
    const scrollBullet = useRef();
    const styles = {
        display: display,
        top: props.verticalGap,
        right: props.lateralGap,
        width: props.width,
        backgroundColor: props.color,
        borderRadius: props.radius,
    };
    let box = undefined;
    let bullet = undefined;
    let bulletSize = undefined;

    useEffect(() => {
        box = scrollBullet.current.parentNode;
        bullet = scrollBullet.current;
        bulletSize = box.offsetHeight * box.offsetHeight/box.scrollHeight;
        bullet.style.height = `${bulletSize}px`;
        box.classList.add('custom-scroll-box');
    });

    useEffect(() => {
        const initialScrollHeight = box.scrollHeight;
        let watch = setInterval(() => {
            if (box.scrollHeight !== initialScrollHeight) {
                forceUpdate({});
            }
            if (box.scrollHeight > box.offsetHeight) {
                setDisplay('block');
            } else {
                setDisplay('none');
            }
        }, 100);

        return () => clearInterval(watch);
    });

    useEffect(() => {
        const verticalGap = parseInt(props.verticalGap);
        const bulletRange = box.scrollHeight - bulletSize - 2 * verticalGap;
        const scrollRange = box.scrollHeight - box.offsetHeight;
        const moveBullet = () => {
            let bulletPosition = bulletRange * box.scrollTop/scrollRange;
            bullet.style.top = `${verticalGap + bulletPosition}px`;
        };

        box.addEventListener('scroll', moveBullet);
        return () => box.removeEventListener('scroll', moveBullet);
    });

    useEffect(() => {
        if (props.fading) {
            let scrollStop = null;
            const isScrolling = () => {
                bullet.style.opacity = 1;
                if (scrollStop) {
                    clearTimeout(scrollStop);
                }
                scrollStop = setTimeout(() => bullet.style.opacity = 0, 200);
            };

            box.addEventListener('scroll', isScrolling);
            return () => box.removeEventListener('scroll', isScrolling);
        } else {
            bullet.style.opacity = 1;
        }
    });

    return (
        <div ref={scrollBullet} className='custom-scroll' style={styles}></div>
    );
}

CustomScroll.defaultProps = {
    verticalGap: '3px',
    lateralGap: '3px',
    width: '4px',
    color: 'rgba(60, 60, 60, 0.6)',
    radius: '2px',
}
