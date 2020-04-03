import React from "react";
import {Switch, Route} from 'react-router-dom';
import style from './Main.module.css';
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";
import App from "../App/App";
import {API} from "../../API/serverAPI";
import Loading from "../Loading/Loading";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this._onSwitchLoadingData();
        API.isAuth()
            .then(res => {
                if (this.state.isAuth === res.data.isAuth) {
                    this._onSwitchLoadingData();
                    return;
                }
                this._onSwitchLoadingData();
                this.setState({isAuth: res.data.isAuth});
            })
            .catch(err => {
                console.log('Auth DidMount err', err);
                this.setState({isLoading: false});
            })
    }

    _changeAuth = (isAuth) => {
        if (this.state.isAuth === isAuth.isAuth) return;
        this.setState({isAuth: isAuth.isAuth})
    };

    _onSwitchLoadingData = () => {
      this.setState({isLoading: !this.state.isLoading})
    };

    render() {
        const isAuth = this.state.isAuth;
        const loadingView = this.state.isLoading ? <Loading/> : null;
        return (
            <div className={style.main_container}>
                <h1>The todo list - application which help to save your time</h1>
                <Switch>
                    <Route exact path={'/'}>
                        <Auth isAuth={isAuth} changeAuth={this._changeAuth}
                              switchLoading={this._onSwitchLoadingData}/>
                    </Route>
                    <Route path={'/auth'}>
                        <Auth isAuth={isAuth} changeAuth={this._changeAuth}
                              switchLoading={this._onSwitchLoadingData}/>
                    </Route>
                    <Route path={'/registration'}>
                        <Registration isAuth={isAuth} changeAuth={this._changeAuth}
                                      switchLoading={this._onSwitchLoadingData}/>
                    </Route>
                    <Route path={'/app'}>
                        <App isAuth={isAuth} changeAuth={this._changeAuth}
                             switchLoading={this._onSwitchLoadingData}/>
                    </Route>
                </Switch>
                {loadingView}
            </div>
        );
    }
}

export default Main;