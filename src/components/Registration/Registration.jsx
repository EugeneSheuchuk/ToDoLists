import React from "react";
import style from './Registration.module.css';
import InputText from "../InputText/InputText";
import {Redirect} from "react-router-dom";
import Button from "../Button/Button";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const isAuth = this.props.isAuth;
        if (isAuth) return <Redirect to={'/app'}/>;
        return (
            <div className={style.reg_container}>
                <div className={style.name}>
                    <label htmlFor="regName">Enter your first name</label>
                    <InputText imputId={'regName'}/>
                </div>
                <div className={style.surname}>
                    <label htmlFor="regSurname">Enter your surname</label>
                    <InputText imputId={'regSurname'}/>
                </div>
                <div className={style.email}>
                    <label htmlFor="regEmail">Enter your email address</label>
                    <InputText imputId={'regEmail'}/>
                </div>
                <div className={style.pass}>
                    <label htmlFor="regPass">Enter your pass</label>
                    <InputText imputId={'regPass'}/>
                </div>
                <Button value={'Sign up'}/>
            </div>
        );
    }
}

export default Registration;