import React from 'react';
import './App.css';
import List from './components/list/List'
import InputText from "./components/InputText/InputText";
import Button from "./components/Button/Button";
import {saveToStorageMainData} from "./assets/functions";
import {API} from "./API/serverAPI";

const APPID = 'toDoLists';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: '',
            lists: [],
        };
    }

    componentDidMount() {
        API.getDataById(APPID).then(res => this.setState({...res.data}));
    }

    _onType = e => {
        const listName = e.target.value;
        this.setState({listName});
    };
    _onAddList = () => {
        API.addList(APPID, this.state.listName)
            .then(res => this.setState({...res.data, listName: ''}));
    };
    _onPressEnter = e => {
        if (e.key === 'Enter') {
            this._onAddList();
        }
    };
    _onDeleteList = ({itemId: listId}) => {
        const lists = [...this.state.lists];
        const filterLists = lists.filter(item => item.listId !== listId);
        this.setState({lists: filterLists,}, () => saveToStorageMainData(this.state, APPID));
    };
    _onSaveNewListName = (listId, listName) => {
        const lists = [...this.state.lists];
        lists.forEach(item => {
            if (item.listId === listId) {
                item.listName = listName;
            }
        });
        this.setState({lists,}, () => saveToStorageMainData(this.state, APPID));
    };


    render() {

        const displayLists = this.state.lists.map(item => <List listName={item.listName}
                                                                listId={item.listId}
                                                                key={`key-${item.listId}`}
                                                                deleteList={this._onDeleteList}
                                                                editListName={this._onSaveNewListName}/>);
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
                    {displayLists}
                </div>
            </div>
        );
    }
}

export default App;
