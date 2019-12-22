import React, { useState, useRef, useEffect } from 'react';

export default function CustomScroll(props) {
    const [, forceUpdate] = useState();
    const [display, setDisplay] = useState('none');
    const scrollBullet = useRef();
    const styles = {
        display: display,
        top: props.verticalGap,
        right: props.lateralGap,
        width: props.width,
        backgroundColor: props.color,
        borderRadius: props.radius,
        position: 'absolute',
        opacity: '0',
        transition: 'opacity 0.5s',
    };

    useEffect(() => {
        const bullet = scrollBullet.current;
        const box = scrollBullet.current.parentNode;
        const initialScrollHeight = box.scrollHeight;
        const bulletSize = box.offsetHeight * box.offsetHeight/box.scrollHeight;
        bullet.style.height = `${bulletSize}px`;

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

        const verticalGap = parseInt(props.verticalGap);
        const bulletRange = box.scrollHeight - bulletSize - 2 * verticalGap;
        const scrollRange = box.scrollHeight - box.offsetHeight;
        const moveBullet = () => {
            let bulletPosition = bulletRange * box.scrollTop/scrollRange;
            bullet.style.top = `${verticalGap + bulletPosition}px`;
        };

        let scrollStop = null;
        const isScrolling = () => {
            bullet.style.opacity = 1;
            if (scrollStop) {
                clearTimeout(scrollStop);
            }
            scrollStop = setTimeout(() => bullet.style.opacity = 0, 200);
        };

        box.addEventListener('scroll', moveBullet);
        box.addEventListener('scroll', isScrolling);

        return () => {
            box.removeEventListener('scroll', moveBullet);
            box.removeEventListener('scroll', isScrolling);
            clearInterval(watch);
        };
    });

    return (
        <div ref={scrollBullet} style={styles}></div>
    );
}

CustomScroll.defaultProps = {
    verticalGap: '3px',
    lateralGap: '3px',
    width: '4px',
    color: 'rgba(60, 60, 60, 0.6)',
    radius: '2px',
}
