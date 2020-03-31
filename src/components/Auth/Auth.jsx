import React from "react";
import style from './Auth.module.css';
import {Redirect, withRouter} from "react-router-dom";
import Button from "../Button/Button";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
        };
    };
    _onSignUp = () => {
        this.props.history.push('/registration');
    };
    _onCHangeField = (e, type) => {
        if (type === 'email') {
            this.setState({email: e.target.value});
        } else if (type === 'pass') {
            this.setState({pass: e.target.value});
        }
    };
    _sigIn = () => {
        console.log(this.state);
        this.setState({email:'', pass:''})
    };

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.auth_container}>
                <div className={style.email}>
                    <label htmlFor="authEmail">Enter your email address:</label>
                    <input type='email' id='authEmail' value={this.state.email}
                           onChange={(e) => this._onCHangeField(e, 'email')}/>
                    <p className="error">The field cannot be empty</p>
                </div>
                <div className={style.pass}>
                    <label htmlFor="authPass">Enter your pass:</label>
                    <input type='password' id='authPass' value={this.state.pass}
                           onChange={(e)=> this._onCHangeField(e, 'pass')}/>
                    <p className="error">The field cannot be empty</p>
                </div>
                <div className={style.links}>
                    <Button value={'Sign up'}
                            action={this._onSignUp}
                            styleClass='link_button'/>
                    <Button value={'Sign in'}
                            action={this._sigIn}
                            styleClass='link_button'/>
                </div>
            </div>
        );
    }
}

export default withRouter(Auth);