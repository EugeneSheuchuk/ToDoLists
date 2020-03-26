import React from 'react';
import style from './Button.module.css';

class Button extends React.Component {

    render() {
        const {value, action, itemId, styleClass, data} = this.props;
        const button = styleClass
            ?
            <input type="button" value={value} onClick={(e) => action({e, itemId, data})} className={`${style[styleClass]}`}/>
            : <input type="button" value={value} onClick={(e) => action({e, itemId, data})}/>;

        return (
            <React.Fragment>
                {button}
            </React.Fragment>
        );
    }
}

export default Button;