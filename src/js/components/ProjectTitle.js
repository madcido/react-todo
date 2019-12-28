import React, { useEffect, useRef } from 'react';

export default function ProjectTitle(props) {
    const textareaRef = useRef();

    useEffect(() => {
        const textarea = textareaRef.current;
        const adjustHeight = () => {
            textarea.style.height = '0';
            textarea.style.height = textarea.scrollHeight + 'px';
        };
        if (textarea) {
            textarea.style.height = textarea.scrollHeight + 'px';
            textarea.addEventListener('input', adjustHeight);
            return () => textarea.removeEventListener('input', adjustHeight);
        }
    });

    return (
        <textarea
            ref={textareaRef}
            spellCheck='false'
            onFocus={props.autoFocus ? e => e.target.setSelectionRange(0, e.target.value.length) : null}
            {...props}
        ></textarea>
    );
}
