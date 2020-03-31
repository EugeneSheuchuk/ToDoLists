import React from "react";
import style from './Auth.module.css';
import {Link, Redirect} from "react-router-dom";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.auth_container}>
                <div className={style.email}>
                    <label htmlFor="authEmail">Enter your email address</label>
                    <InputText imputId={'authEmail'}/>
                </div>
                <div className={style.pass}>
                    <label htmlFor="authPass">Enter your pass</label>
                    <InputText imputId={'authPass'}/>
                </div>
                <Link to={'/registration'}>Sign up</Link>
                <Button value={'Sign in'}/>
            </div>
        );
    }
}

export default Auth;