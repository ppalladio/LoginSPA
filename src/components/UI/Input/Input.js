import classes from './Input.module.css';
import React, { useRef, useImperativeHandle } from 'react';
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
   
    const active = () => {
        inputRef.current.focus();
    };
    useImperativeHandle(ref, () => {
        return {
            focus: active,
        };
    });
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.lable}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;
//: use useRef to 