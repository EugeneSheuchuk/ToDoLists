import React from "react";
import {Switch, Route} from 'react-router-dom';
import style from './Main.module.css';
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";
import App from "../App/App";
import {API} from "../../API/serverAPI";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
        };
    }

    componentDidMount() {
        API.isAuth()
            .then(res => {
                if (this.state.isAuth === res.data.isAuth) return;
                this.setState({isAuth: res.data.isAuth});
            })
            .catch(err => console.log('Auth DidMount err', err))
    }

    _changeAuth = (isAuth) => {
        if (this.state.isAuth === isAuth.isAuth) return;
        this.setState({isAuth: isAuth.isAuth})
    };

    render() {
        const isAuth = this.state.isAuth;

        return (
            <div className={style.main_container}>
                <h1>The todo list - application which help to save your time</h1>
                <Switch>
                    <Route exact path={'/'}>
                        <Auth isAuth={isAuth} changeAuth={this._changeAuth}/>
                    </Route>
                    <Route path={'/auth'}>
                        <Auth isAuth={isAuth} changeAuth={this._changeAuth}/>
                    </Route>
                    <Route path={'/registration'}>
                        <Registration isAuth={isAuth} changeAuth={this._changeAuth}/>
                    </Route>
                    <Route path={'/app'}>
                        <App isAuth={isAuth} changeAuth={this._changeAuth}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;