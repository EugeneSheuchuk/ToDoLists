import React from "react";

class InputText extends React.Component {

    render() {
        const {imputId, imputValue, action} = this.props;

        return (
            <React.Fragment>
                <input type="text"
                       id={imputId}
                       value={imputValue}
                       onChange={(e) => action(e)}/>
            </React.Fragment>
        );
    }
}

export default InputText;