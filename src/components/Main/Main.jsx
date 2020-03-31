import React from "react";
import {Switch, Route} from 'react-router-dom';
import style from './Main.module.css';
import Auth from "../Auth/Auth";
import Registration from "../Registration/Registration";
import App from "../App/App";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
        };
    }

    render() {
        const isAuth = this.state.isAuth;

        return (
            <div>
                <Switch>
                    <Route exact path={'/'}>
                        <Auth isAuth={isAuth}/>
                    </Route>
                    <Route path={'/auth'}>
                        <Auth isAuth={isAuth}/>
                    </Route>
                    <Route path={'/registration'}>
                        <Registration isAuth={isAuth}/>
                    </Route>
                    <Route path={'/app'}>
                        <App isAuth={isAuth}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;