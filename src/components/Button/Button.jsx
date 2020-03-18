import React from 'react';
import style from './Button.module.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const value = this.props.value;
        const action = this.props.action;
        const itemId = this.props.itemId;
        const styleClass = this.props.styleClass;

        const button = styleClass
            ?
            <input type="button" value={value} onClick={(e) => action({e, itemId})} className={`${style[styleClass]}`}/>
            : <input type="button" value={value} onClick={(e) => action({e, itemId})}/>;
        return (
            <React.Fragment>
                {button}
            </React.Fragment>
        );
    }
}

export default Button;