import React from "react";
import style from './InputText.module.css';

class InputText extends React.Component {

    render() {
        const {
            imputId, imputValue, action,
            focus = false, keyAction = null, blur = null, name
        } = this.props;

        return (
            <React.Fragment>
                <input type="text"
                       id={imputId}
                       value={imputValue}
                       onChange={(e) => action(e)}
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
                       className={`${style[name]}`}/>
            </React.Fragment>
        );
    }
}

export default InputText;