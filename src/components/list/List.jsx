import React from 'react';
import style from './List.module.css';
import Button from "../Button/Button";
import {filterArray} from "../../assets/functions";
import InputText from "../InputText/InputText";
import {API} from "../../API/serverAPI";
import Error from "../Error/Error";

export const status = {
    complete: 'Complete',
    inProcess: 'In progress',
};
export const taskView = {
    all: 'All',
    complete: 'Complete',
    inProgress: 'In progress',
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: '',
            tasks: [],
            taskView: taskView.all,
            editField: '',
            editItemId: null,
            editListName: '',
            isEditHeader: false,
            isError: false,
            errorText: ''
        };
        this.addTask = this._addTask.bind(this);
        this.changeTaskStatus = this._onChangeTaskStatus.bind(this);
        this.filterTask = this._onFilterTasks.bind(this);
        this.typeText = this._onTypeText.bind(this);
        this.editText = this._onEditText.bind(this);
        this.pressEnter = this._onPressEnter.bind(this);
        this.blur = this._onBlureEditTask.bind(this);
        this.deleteTask = this._onDeleteTask.bind(this);
        this._editHeader = this._onEditHeader.bind(this);
        this._saveHeader = this._onSaveHeader.bind(this);
        this.resetError = this._onResetError.bind(this);
    };

    componentDidMount() {
        const {appId, listId} = this.props;
        API.getListTasks(appId, listId)
            .then(res => this.setState({tasks: [...res.data]}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onTypeText(e) {
        const newText = e.target.value;
        this.setState({field: newText});
    };

    _addTask({e}) {
        e.preventDefault();
        const {appId, listId} = this.props;
        if (this.state.field.trim() === '') {
            this.setState({isError: true, errorText: 'The field cannot be empty'});
            return;
        }
        const task = {
            taskText: this.state.field,
            taskStatus: status.inProcess,
            isEdit: false,
            listId,
        };
        API.addNewTask(appId, task)
            .then(res => this.setState({field: '', tasks: [...res.data]}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onChangeTaskStatus({e, itemId: taskId, data: currentStatus}) {
        e.preventDefault();
        const {appId, listId} = this.props;
        API.changeTaskStatus(appId, listId, taskId, currentStatus)
            .then(res => this.setState({tasks: [...res.data]}))
            .catch(err => this.setState({isError: true, errorText: err.response.data}));
    };

    _onFilterTasks({e, itemId}) {
        e.preventDefault();
        this.setState({taskView: itemId});
    };

    _onEditTask({e, taskId}) {
        e.preventDefault();
        const tasksList = [...this.state.tasks];
        let editField = '';
        tasksList.forEach(item => {
            if (item.taskId === taskId) {
                item.isEdit = !item.isEdit;
                editField = item.taskText;
            }
        });
        this.setState({tasks: tasksList, editField, editItemId: taskId});
    };

    _onEditText(e) {
        const newText = e.target.value;
        this.setState({editField: newText});
    };

    _onSaveEditTask() {
        const {appId, listId} = this.props;
        API.changeTask(appId, listId, this.state.editItemId, this.state.editField)
            .then(res => {
                console.log('res', res);
                this.setState({editField: '', editItemId: null, tasks: [...res.data]})
            });
    };

    _onPressEnter(e) {
        if (e.key === 'Enter') {
            this._onSaveEditTask();
        }
    };

    _onBlureEditTask() {
        this._onSaveEditTask();
    };

    _onDeleteTask({e, itemId: taskId}) {
        e.preventDefault();
        const {appId, listId} = this.props;
        API.deleteTask(appId, listId, taskId)
            .then(res => this.setState({tasks: [...res.data]}));
    };

    _onStartEditListHeader(currentName) {
        this.setState({isEditHeader: !this.state.isEditHeader, editListName: currentName});
    };

    _onEditHeader(e) {
        const newText = e.target.value;
        this.setState({editListName: newText});
    };

    _onSaveHeader(e) {
        if (e === undefined || e.key === 'Enter') {
            this.props.editListName(this.props.listId, this.state.editListName);
            this.setState({editListName: '', isEditHeader: !this.state.isEditHeader})
        }
    };

    _onResetError() {
        this.setState({isError: false, errorText: ''});
    };

    render() {
        const {listName, listId, deleteList} = this.props;
        const listHeader = this.state.isEditHeader
            ? <InputText imputValue={this.state.editListName}
                         focus={true}
                         action={this._editHeader}
                         keyAction={this._saveHeader}
                         blur={this._saveHeader}/>
            : <h2 onDoubleClick={() => this._onStartEditListHeader(listName)}>{listName}</h2>;


        const tasksList = filterArray(this.state.tasks, this.state.taskView);
        const viewTasks = tasksList.map((item, index) => {
            return (
                <div className={style.taskContainer} key={`${item.taskText}-${index}`}>
                    <div className={`${style.taskNumber} ${style.taskItem}`}>{index + 1}.</div>
                    <div className={`${style.taskText} ${style.taskItem}`}
                         onDoubleClick={(e) => this._onEditTask({e, taskId: item._id})}>
                        {item.isEdit
                            ? <InputText imputValue={this.state.editField}
                                         focus={true}
                                         action={this.editText}
                                         keyAction={this.pressEnter}
                                         blur={this.blur}/>
                            : item.taskText}
                    </div>
                    <div className={`${style.taskStatus} ${style.taskItem}`}>{item.taskStatus}</div>
                    <div className={`${style.taskButtons} ${style.taskItem}`}>
                        {item.taskStatus === status.inProcess
                            ? <Button value={'Complete Task'}
                                      action={this.changeTaskStatus}
                                      itemId={item._id}
                                      styleClass='taskButton'
                                      data={item.taskStatus}/>
                            : <Button value={'Undo'}
                                      action={this.changeTaskStatus}
                                      itemId={item._id}
                                      styleClass='taskButton'
                                      data={item.taskStatus}/>}
                        <Button value={'Delete'}
                                action={this.deleteTask}
                                itemId={item._id}
                                styleClass='taskButton'/>
                    </div>
                </div>
            );
        });
        const filterButtons = [];
        for (let key in taskView) {
            this.state.taskView === taskView[key]
                ? filterButtons.push(<Button value={taskView[key]}
                                             action={this.filterTask}
                                             itemId={taskView[key]}
                                             styleClass='activeButton'
                                             key={`${key}`}/>)
                : filterButtons.push(<Button value={taskView[key]}
                                             action={this.filterTask}
                                             itemId={taskView[key]}
                                             key={`${key}`}/>)
        }
        const display = [
            <div className={style.tasksContainer} key={`task_with_filterButtons-${listId}`}>
                {viewTasks}
                <div className={`${style.tasksFilter}`}>
                    {filterButtons}
                </div>
            </div>,
            <div className={style.deleteList} key={`delete_list-${listId}`}>
                <Button value={'Delete list'} itemId={listId} action={deleteList} />
            </div>];

        const viewComponent = this.state.isError
            ? <Error errorText={this.state.errorText} errorReset={this.resetError}/>
            : display;

        return (
            <div className={style.listContainer}>
                {listHeader}
                <div className={style.proposal}>
                    <label htmlFor={`${listName}_${listId}`}>Enter your task, please!</label>
                    <InputText imputId={`${listName}_${listId}`}
                               imputValue={this.state.field}
                               action={this.typeText}
                               name={'taskInput'}/>
                    <Button value={'Add'} action={this.addTask} styleClass='addTaskButton'/>
                </div>
                {viewComponent}
            </div>
        );
    }
}

export default List