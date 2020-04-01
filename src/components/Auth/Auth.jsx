import React from "react";
import style from './Auth.module.css';
import {Redirect, withRouter} from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {API} from "../../API/serverAPI";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            errorEmail: '',
            errorPass: '',
        }
    };

    _onSignUp = () => {
        this.props.history.push('/registration');
    };
    _onChangeField = (e, type) => {
        if (type === 'email') {
            this.setState({email: e.target.value});
        } else if (type === 'pass') {
            this.setState({pass: e.target.value});
        }
    };
    _sigIn = () => {
        const error = {};
        if (this.state.email.trim() === '') {
            error.isError = true;
            error.email = 'email field cannot be empty';
        }
        if (this.state.pass.trim() === '') {
            error.isError = true;
            error.pass = 'pass field cannot be empty';
        }
        if (!error.email) {
                if (this.state.email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== 0) {
                    error.isError = true;
                    error.email = 'error in email field';
                }
        }
        if (error.isError) {
            this.setState({errorEmail: error.email, errorPass: error.pass});
            return;
        }
        this.setState({email:'', pass:'', errorEmail:'', errorPass:''});
    };

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.auth_container}>
                <div className={style.email}>
                    <label htmlFor="authEmail">Enter your email address:</label>
                    <Input imputType={'email'}
                           imputId={'authEmail'}
                           value={this.state.email}
                           action={this._onChangeField}
                           fieldType={'email'}
                           placeholder={'example@example.com'}/>
                    <p className="error">{this.state.errorEmail}</p>
                </div>
                <div className={style.pass}>
                    <label htmlFor="authPass">Enter your pass:</label>
                    <Input imputType={'password'}
                           imputId={'authPass'}
                           value={this.state.pass}
                           action={this._onChangeField}
                           fieldType={'pass'}/>
                    <p className="error">{this.state.errorPass}</p>
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