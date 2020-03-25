import React from 'react';
import style from './Error.module.css';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerId: null,
            timer: 0,
            errorText: ''
        }
    }

    componentDidMount() {
        const {errorText} = this.props;
        this.setState({timer: 5, errorText});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {timer} = this.state;
        if (timer === 0) {
            this.props.errorReset();
        } else {
            setTimeout(() => this.setState({timer: timer - 1}), 1000)
        }
    }

    render() {
        const errorText = this.state.errorText;
        const timer = this.state.timer;
        return (
            <div>
                <div className={style.errorText}>{errorText}</div>
                <div>The error text will be clean after <span className={style.timer}>{timer}</span> seconds</div>
            </div>
        );
    }
}

export default Error;