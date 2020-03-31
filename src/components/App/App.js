import React from 'react';
import {Redirect} from "react-router-dom";
import './App.css';
import List from './../list/List'
import InputText from "./../InputText/InputText";
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
            errorText: ''
        };
    };

    componentDidMount = () => {
        API.getDataById(APPID)
            .then(res => this.setState({lists: [...res.data]}))
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
        API.addList(APPID, this.state.listName)
            .then(res => this.setState({lists: [...res.data], listName: ''}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onPressEnter = e => {
        if (e.key === 'Enter') {
            this._onAddList();
        }
    };

    _onDeleteList = ({itemId: listId}) => {
        API.deleteList(APPID, listId)
            .then(res => this.setState({lists: [...res.data]}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onSaveNewListName = (listId, listName) => {
        if (listName.trim() === '') {
            this.setState({isError: true, errorText: 'The field cannot be empty'});
            return;
        }
        API.updateListName(APPID, listId, listName)
            .then(res => this.setState({lists: [...res.data]}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onResetError = () => {
        this.setState({isError: false, errorText: ''});
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
                                                                appId={APPID}/>);
        const viewComponent = this.state.isError
            ? <Error errorText={this.state.errorText} errorReset={this._onResetError}/>
            : displayLists;

        return (
            <div className={'app_container'}>
                <div>
                    <h1>Enter the name of list, please!</h1>
                    <InputText imputValue={this.state.listName}
                               action={this._onType}
                               keyAction={this._onPressEnter}/>
                    <Button value={'Add list'} action={this._onAddList}/>
                </div>
                <div>
                    {viewComponent}
                </div>
            </div>
        );
    }
}

export default App;