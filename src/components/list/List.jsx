import React from 'react';
import style from './List.module.css';
import Button from "../Button/Button";
import {filterArray} from "../../assets/functions";
import Input from "../Input/Input";
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
            tasks: [...props.tasks],
            taskView: taskView.all,
            prevTextTask: '',
            editField: '',
            editItemId: null,
            prevListName: '',
            editListName: '',
            isEditHeader: false,
            isError: false,
            errorText: ''
        };
    };

    _onTypeText = (e) => {
        const newText = e.target.value;
        this.setState({field: newText});
    };

    _onAddTask = ({e}) => {
        e.preventDefault();
        const {listId} = this.props;
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
        this.props.switchLoading();
        API.addNewTask(task)
            .then(res => {
                this.props.switchLoading();
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({field: '', tasks: [...res.data.data]})
            })
            .catch(err => {
                this.props.switchLoading();
                this.setState({isError: true, errorText: err.response.data});
            });
    };

    _onChangeTaskStatus = ({e, itemId: taskId, data: currentStatus}) => {
        e.preventDefault();
        const {listId} = this.props;
        this.props.switchLoading();
        API.changeTaskStatus(listId, taskId, currentStatus)
            .then(res => {
                this.props.switchLoading();
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({tasks: [...res.data.data]})
            })
            .catch(err => {
                this.props.switchLoading();
                this.setState({isError: true, errorText: err.response.data});
            });
    };

    _onFilterTasks = ({e, itemId}) => {
        e.preventDefault();
        this.setState({taskView: itemId});
    };

    _onEditTask = ({e, taskId}) => {
        e.preventDefault();
        const tasksList = [...this.state.tasks];
        let editField = '';
        tasksList.forEach(item => {
            if (item._id === taskId) {
                item.isEdit = !item.isEdit;
                editField = item.taskText;
            }
        });
        this.setState({tasks: tasksList, editField, prevTextTask: editField, editItemId: taskId});
    };

    _onEditText = (e) => {
        const newText = e.target.value;
        this.setState({editField: newText});
    };

    _onSaveEditTask = () => {
        const {listId} = this.props;
        if (this.state.editField.trim() === '') {
            this.setState({isError: true, errorText: 'The task text field cannot be empty'});
            return;
        }
        if (this.state.prevTextTask === this.state.editField.trim()) {
            const tasksList = [...this.state.tasks];
            tasksList.forEach(item => {
                if (item._id === this.state.editItemId) {
                    item.isEdit = !item.isEdit;
                }
            });
            this.setState({tasks: tasksList, editField: '', prevTextTask: '', editItemId: ''});
            return;
        }
        this.props.switchLoading();
        API.changeTask(listId, this.state.editItemId, this.state.editField)
            .then(res => {
                this.props.switchLoading();
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({editField: '', prevTextTask: '', editItemId: null, tasks: [...res.data.data]});
            })
            .catch(err => {
                this.props.switchLoading();
                this.setState({isError: true, errorText: err.response.data});
            });
    };

    _onPressEnter = (e) => {
        if (e.key === 'Enter') {
            this._onSaveEditTask();
        }
    };

    _onPressEnterToAddTask = (e) => {
        if (e.key === 'Enter') {
            this._onAddTask({e});
        }
    };

    _onBlurEditTask = () => {
        this._onSaveEditTask();
    };

    _onDeleteTask = ({e, itemId: taskId}) => {
        e.preventDefault();
        const {listId} = this.props;
        this.props.switchLoading();
        API.deleteTask(listId, taskId)
            .then(res => {
                this.props.switchLoading();
                if (!res.data.isAuth) return this.props.changeAuth({isAuth: res.data.isAuth});
                this.setState({tasks: [...res.data.data]});
            })
            .catch(err => {
                this.props.switchLoading();
                this.setState({isError: true, errorText: err.response.data});
            });
    };

    _onStartEditListHeader = (currentName) => {
        this.setState({
            isEditHeader: !this.state.isEditHeader,
            editListName: currentName, prevListName: currentName
        });
    };

    _onEditHeader = (e) => {
        const newText = e.target.value;
        this.setState({editListName: newText});
    };

    _onSaveHeader = (e) => {
        if (e === undefined || e.key === 'Enter') {
            this.props.editListName(this.props.listId, this.state.editListName, this.state.prevListName);
            this.setState({editListName: '', isEditHeader: !this.state.isEditHeader, prevListName: ''});
        }
    };

    _onResetError = () => {
        this.setState({isError: false, errorText: ''});
    };

    render() {
        const {listName, listId, deleteList} = this.props;
        const listHeader = this.state.isEditHeader
            ? <Input imputValue={this.state.editListName}
                     focus={true}
                     action={this._onEditHeader}
                     keyAction={this._onSaveHeader}
                     blur={this._onSaveHeader}/>
            : <h2 onDoubleClick={() => this._onStartEditListHeader(listName)}
                  title="Make double click to change">{listName}</h2>;


        const tasksList = filterArray(this.state.tasks, this.state.taskView);
        const viewTasks = tasksList.map((item, index) => {
            return (
                <div className={style.taskContainer} key={`${item.taskText}-${index}`}>
                    <div className={`${style.taskNumber} ${style.taskItem}`}>{index + 1}.</div>
                    <div className={`${style.taskText} ${style.taskItem}`}
                         onDoubleClick={(e) => this._onEditTask({e, taskId: item._id})}
                         title="Make double click to change">
                        {item.isEdit
                            ? <Input imputValue={this.state.editField}
                                     focus={true}
                                     action={this._onEditText}
                                     keyAction={this._onPressEnter}
                                     blur={this._onBlurEditTask}/>
                            : item.taskText}
                    </div>
                    <div className={`${style.taskStatus} ${style.taskItem}`}>{item.taskStatus}</div>
                    <div className={`${style.taskButtons} ${style.taskItem}`}>
                        {item.taskStatus === status.inProcess
                            ? <Button value={'Complete Task'}
                                      action={this._onChangeTaskStatus}
                                      itemId={item._id}
                                      styleClass='taskButton'
                                      data={item.taskStatus}/>
                            : <Button value={'Undo'}
                                      action={this._onChangeTaskStatus}
                                      itemId={item._id}
                                      styleClass='taskButton'
                                      data={item.taskStatus}/>}
                        <Button value={'Delete'}
                                action={this._onDeleteTask}
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
                                             action={this._onFilterTasks}
                                             itemId={taskView[key]}
                                             styleClass='activeButton'
                                             key={`${key}`}/>)
                : filterButtons.push(<Button value={taskView[key]}
                                             action={this._onFilterTasks}
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
                <Button value={'Delete list'} itemId={listId} action={deleteList}/>
            </div>];

        const viewComponent = this.state.isError
            ? <Error errorText={this.state.errorText} errorReset={this._onResetError}/>
            : display;

        return (
            <div className={style.listContainer}>
                {listHeader}
                <div className={style.proposal}>
                    <label htmlFor={`${listName}_${listId}`}>Enter your task, please!</label>
                    <Input imputId={`${listName}_${listId}`}
                           imputValue={this.state.field}
                           action={this._onTypeText}
                           name={'taskInput'}
                           keyAction={this._onPressEnterToAddTask}/>
                    <Button value={'Add'} action={this._onAddTask} styleClass='addTaskButton'/>
                </div>
                {viewComponent}
            </div>
        );
    }
}

export default List