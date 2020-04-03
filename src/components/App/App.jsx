import React from 'react';
import {Redirect} from "react-router-dom";
import './App.css';
import List from './../list/List'
import Input from "../Input/Input";
import Button from "./../Button/Button";
import {API} from "./../../API/serverAPI";
import Error from "./../Error/Error";

const APPID = 'toDoLists';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: '',
            lists: [],
            isError: false,
            errorText: '',
        };
    };

    componentDidMount = () => {
        const isAuth = this.props.isAuth;
        if (!isAuth) return;
        API.getUserLists()
            .then(res => {
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({lists: [...res.data.data]});
            })
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onType = e => {
        const listName = e.target.value;
        this.setState({listName});
    };

    _onAddList = () => {
        if (this.state.listName.trim() === '') {
            this.setState({isError: true, errorText: 'The field cannot be empty'});
            return;
        }
        API.addList(this.state.listName)
            .then(res => {
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({lists: [...res.data.data], listName: ''})
            })
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onPressEnter = e => {
        if (e.key === 'Enter') {
            this._onAddList();
        }
    };

    _onDeleteList = ({itemId: listId}) => {
        API.deleteList(listId)
            .then(res => {
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({lists: [...res.data.data]});
            })
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onSaveNewListName = (listId, listName, prevListName) => {
        if (listName.trim() === prevListName) return;
        if (listName.trim() === '') {
            this.setState({isError: true, errorText: 'The field cannot be empty'});
            return;
        }
        API.updateListName(listId, listName)
            .then(res => {
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({lists: [...res.data.data]})
            })
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onResetError = () => {
        this.setState({isError: false, errorText: ''});
    };
    _onLogOut = () => {
        API.logOut()
            .then(res => {
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                alert('Something went wrong, try again later');
            })
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    render() {
        const isAuth = this.props.isAuth;
        if (!isAuth) return <Redirect to={'/auth'}/>;

        const displayLists = this.state.lists.map(item => <List listName={item.listName}
                                                                listId={item._id}
                                                                key={`key-${item._id}`}
                                                                deleteList={this._onDeleteList}
                                                                editListName={this._onSaveNewListName}
                                                                taskView={item.taskView}
                                                                appId={APPID}
                                                                changeAuth={this.props.changeAuth}/>);
        const viewComponent = this.state.isError
            ? <Error errorText={this.state.errorText} errorReset={this._onResetError}/>
            : displayLists;

        return (
            <div className={'app_container'}>
                <div>
                    <div className="header">
                        <h1 className={'app_h1'}>Enter the name of new list, please!</h1>
                        <Button value={'Log out'} action={this._onLogOut} styleClass={'logOutButton'}/>
                    </div>
                    <Input imputValue={this.state.listName}
                           action={this._onType}
                           keyAction={this._onPressEnter}
                           name={'add_list'}/>
                    <Button value={'Add list'}
                            action={this._onAddList}
                            styleClass={'add_list_button'}/>
                </div>
                <div className={'app_lists_container'}>
                    {viewComponent}
                </div>
            </div>
        );
    }
}

export default App;
