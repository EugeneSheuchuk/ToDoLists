import React from "react";
import style from './Registration.module.css';
import Input from "../Input/Input";
import {Redirect} from "react-router-dom";
import Button from "../Button/Button";
import {API} from "../../API/serverAPI";
import {checkComponentFields} from "../../assets/functions";

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
            default:
                break;
        }
    };
    _sigUp = () => {
        const checkState = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            pass: this.state.pass
        };
        const error = checkComponentFields(checkState);
        if (error.isError) {
             delete error.isError;
            this.setState({...this.state, ...error});
            return;
        }

        API.registartionUser({...checkState})
            .then(res => {
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
                this.props.changeAuth(res.data);
            })
            .catch(err => this.setState({...err.response.data}));

    };

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.reg_container}>
                <div className={style.name}>
                    <label htmlFor="regName">Enter your name</label>
                    <Input imputId={'regName'} value={this.state.name}
                           action={this._onChangeField}
                           fieldType='name'
                           placeholder='Bob'/>
                    <p>{this.state.errorName}</p>
                </div>
                <div className={style.surname}>
                    <label htmlFor="regSurname">Enter your surname</label>
                    <Input imputId={'regSurname'} value={this.state.surname}
                           action={this._onChangeField}
                           fieldType='surname'
                           placeholder='Stone'/>
                    <p>{this.state.errorSurname}</p>
                </div>
                <div className={style.email}>
                    <label htmlFor="regEmail">Enter your email address</label>
                    <Input imputType={'email'}
                           imputId={'regEmail'}
                           value={this.state.email}
                           action={this._onChangeField}
                           fieldType='email'
                           placeholder='example@example.com'/>
                    <p>{this.state.errorEmail}</p>
                </div>
                <div className={style.pass}>
                    <label htmlFor="regPass">Enter your pass</label>
                    <Input imputType={'password'}
                           imputId={'regPass'}
                           value={this.state.pass}
                           action={this._onChangeField}
                           fieldType='pass'/>
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