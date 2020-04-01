import React from "react";
import style from './Input.module.css';

class Input extends React.Component {

    render() {
        const {
            imputType = 'text', imputId, imputValue, action,
            focus = false, keyAction = null, blur = null, name, fieldType = null, placeholder = null
        } = this.props;
        return (
            <React.Fragment>
                <input type={imputType}
                       id={imputId}
                       value={imputValue}
                       onChange={(e) => action(e, fieldType)}
                       autoFocus={focus}
                       onKeyPress={(e) => {
                           if (keyAction) {
                               keyAction(e);
                           }
                       }}
                       onBlur={() => {
                           if (blur) {
                               blur();
                           }
                       }}
                       className={`${style[name]}`}
                       placeholder={placeholder}/>
            </React.Fragment>
        );
    }
}

export default Input;