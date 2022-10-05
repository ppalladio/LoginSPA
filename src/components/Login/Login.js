import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    //: useReducer
    const [emailState, dispatchEmail] = useReducer(
        (state, action) => {
            if (action.type === 'USER_INPUT') {
                return { value: action.val, isValid: action.val.includes('@') };
            }
            if (action.type === 'INPUT_BLUR') {
                return { value: '', isValid: false };
            }
            return { value:state.value, isValid: state.value.includes('@') };
        },
        { value: '', isValid: null },
    );

    //:useEffect
    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         //'settimeout return an timeoutID of setTimeout
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6,
    //         );
    //     }, 500); //' set a timer for every key stroke
    //     return () => {
    //         clearTimeout(identifier); //' remove the timer set, hence we are left with the latest timer.
    //     }; //' cleanup function, this function runs before the every new sideeffects exectuction(except for the first time)
    // }, [setFormIsValid, enteredEmail, enteredPassword]); //'either of the variables in the dependency array changes will lead to the function to re-render

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({type:"USER_INPUT'.",val:event.target.value})
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
            event.target.value.trim().length > 6 &&  emailState.isValid //.useReducer
        );
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({type:'INPUT_BLUR'})
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
