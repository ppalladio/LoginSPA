
import classes from './Input.module.css'

function Input(props){

    return(
        <div
        className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
        }`}
    >
        <label htmlFor="email">{props.lable}</label>
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    </div>
    )
}

export default Input;