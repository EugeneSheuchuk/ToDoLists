import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const value = this.props.value;
        const action = this.props.action;
        const itemId = this.props.itemId;

        return (
            <React.Fragment>
                <input type="button" value={value} onClick={(e) => action({e, itemId})}/>
            </React.Fragment>
        );
    }
}

export default Button;