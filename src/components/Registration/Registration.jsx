import React from "react";
import style from './Registration.module.css';
import InputText from "../InputText/InputText";
import {Redirect} from "react-router-dom";
import Button from "../Button/Button";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            pass: '',
            errorName: '',
            errorSurname: '',
            errorEmail: '',
            errorPass: '',
        };
    }

    _onChangeField = (e, type) => {
        switch (type) {
            case 'name':
                this.setState({name: e.target.value});
                break;
            case 'surname':
                this.setState({surname: e.target.value});
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'pass':
                this.setState({pass: e.target.value});
                break;
        }
    };
    _sigUp = () => {
        const error = {};
        if (this.state.name.trim() === '') {
            error.isError = true;
            error.name = 'name field cannot be empty';
        }
        if (this.state.surname.trim() === '') {
            error.isError = true;
            error.surname = 'surname field cannot be empty';
        }
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
            this.setState({
                errorName: error.name,
                errorSurname: error.surname,
                errorEmail: error.email,
                errorPass: error.pass,
            });
            return;
        }
        this.setState({
            name: '',
            surname: '',
            email: '',
            pass: '',
            errorName: '',
            errorSurname: '',
            errorEmail: '',
            errorPass: ''
        });
    };

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.reg_container}>
                <div className={style.name}>
                    <label htmlFor="regName">Enter your name</label>
                    <InputText imputId={'regName'} value={this.state.name}
                               action={this._onChangeField}
                               type='name'
                               placeholder='Bob'/>
                    <p>{this.state.errorName}</p>
                </div>
                <div className={style.surname}>
                    <label htmlFor="regSurname">Enter your surname</label>
                    <InputText imputId={'regSurname'} value={this.state.surname}
                               action={this._onChangeField}
                               type='surname'
                               placeholder='Stone'/>
                    <p>{this.state.errorSurname}</p>
                </div>
                <div className={style.email}>
                    <label htmlFor="regEmail">Enter your email address</label>
                    <InputText imputId={'regEmail'} value={this.state.email}
                               action={this._onChangeField}
                               type='email'
                               placeholder='example@example.com'/>
                    <p>{this.state.errorEmail}</p>
                </div>
                <div className={style.pass}>
                    <label htmlFor="regPass">Enter your pass</label>
                    <InputText imputId={'regPass'} value={this.state.pass}
                               action={this._onChangeField}
                               type='pass'/>
                    <p>{this.state.errorPass}</p>
                </div>
                <Button value={'Sign up'}
                        action={this._sigUp}
                        styleClass='reg_button'/>
            </div>
        );
    }
}

export default Registration;