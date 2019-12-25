import React, { useState, useEffect, useRef } from 'react';

export default function EditableText(props) {
    const [edit, setEdit] = useState(false);
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
        <>{edit ?
            <textarea
                ref={textareaRef}
                className={props.className}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onBlur={() => setEdit(false)}
                onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
                autoFocus
            ></textarea>
            :
            <h2 className={props.className} onClick={() => setEdit(true)}>{props.value}</h2>
        }</>
    );
}
