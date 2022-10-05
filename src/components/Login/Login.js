import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/input';
const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
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
            return { value: state.value, isValid: state.value.includes('@') };
        },
        { value: '', isValid: null },
    );

    //>password reducer

    const [passwordState, dispatchPassword] = useReducer(
        (state, action) => {
            if (action.type === 'USER_PASS') {
                return {
                    value: action.value,
                    isValid: action.value.trim().length > 6,
                };
            }
            if (state.value === 'PASS_VALID') {
                return {
                    value: state.value,
                    isValid: state.value.trim().length > 6,
                };
            }
        },
        { value: '', isValid: null },
    );

    //:useEffect

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    useEffect(() => {
        const identifier = setTimeout(() => {
            //'settimeout return an timeoutID of setTimeout
            setFormIsValid(
                emailIsValid && passwordIsValid, //. enable useeffect by change enteredEnauk,includes('@')  to emailState.IsValid
            );
        }, 500); //' set a timer for every key stroke
        return () => {
            clearTimeout(identifier); //' remove the timer set, hence we are left with the latest timer.
        }; //' cleanup function, this function runs before the every new sideeffects exectuction(except for the first time)
    }, [setFormIsValid, emailIsValid, passwordIsValid]);
    /**
     * 'either of the variables in the dependency array changes will lead to the function to re-render.
     * 'WHEN combined with usereducer, the dependency array should be the whole state instead of of a fraction, OR USE object destruction LINE 50
     * */

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({ type: "USER_INPUT'.", val: event.target.value });
    };

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({ type: 'USER_PASS', value: event.target.value });

        setFormIsValid(
            event.target.value.trim().length > 6 && emailState.isValid, //.useReducer
        );
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'PASS_VALID' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    id="email"
                    type="email"
                    lable="E-mail"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
               <Input
                    id="password"
                    type="password"
                    lable="Password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
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
