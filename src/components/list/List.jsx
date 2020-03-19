import React from 'react';
import style from './List.module.css';
import Button from "../Button/Button";
import {filterArray, saveToStorage} from "../../assets/functions";
import InputText from "../InputText/InputText";

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
            taskId: 0,
            field: '',
            tasksList: [],
            taskView: taskView.all,
            editField: '',
            editItemId: null,
        };
        this.addTask = this._addTask.bind(this);
        this.changeTaskStatus = this._onChangeTaskStatus.bind(this);
        this.filterTask = this._onFilterTasks.bind(this);
        this.typeText = this._onTypeText.bind(this);
        this.editText = this._onEditText.bind(this);
        this.pressEnter = this._onPressEnter.bind(this);
        this.blur = this._onBlureEditTask.bind(this);
        this.deleteTask = this._onDeleteTask.bind(this);
    };

    componentDidMount() {
        const storage = localStorage.getItem('toDoList');
        const parseStorage = JSON.parse(storage);
        this.setState({...parseStorage});
    }

    _onTypeText(e) {
        const newText = e.target.value;
        this.setState({field: newText});
    };

    _addTask({e}) {
        e.preventDefault();
        const task = {
            taskId: this.state.taskId,
            taskText: this.state.field,
            taskStatus: status.inProcess,
            isEdit: false,
        };
        const taskId = this.state.taskId + 1;
        const tasksList = [...this.state.tasksList];
        tasksList.push(task);
        this.setState({
            taskId, field: '', tasksList,
        }, () => saveToStorage(this.state));
    };

    _onChangeTaskStatus({e, itemId: id}) {
        e.preventDefault();
        const tasksList = [...this.state.tasksList];
        tasksList.forEach(item => {
            if (item.taskId === id) {
                item.taskStatus = item.taskStatus === status.inProcess ? status.complete : status.inProcess;
            }
        });
        this.setState({tasksList}, () => saveToStorage(this.state));
    }

    _onFilterTasks({e, itemId}) {
        e.preventDefault();
        this.setState({taskView: itemId}, () => saveToStorage(this.state));
    };

    _onEditTask({e, taskId}) {
        e.preventDefault();
        const tasksList = [...this.state.tasksList];
        let editField = '';
        tasksList.forEach(item => {
            if (item.taskId === taskId) {
                item.isEdit = !item.isEdit;
                editField = item.taskText;
            }
        });
        this.setState({tasksList, editField, editItemId: taskId}, () => saveToStorage(this.state));
    }

    _onEditText(e) {
        const newText = e.target.value;
        this.setState({editField: newText}, () => saveToStorage(this.state));
    };

    _onSaveEditTask() {
        const tasksList = [...this.state.tasksList];
        tasksList.forEach(item => {
            if (item.taskId === this.state.editItemId) {
                item.isEdit = !item.isEdit;
                item.taskText = this.state.editField;
            }
        });
        this.setState({tasksList, editField: '', editItemId: null}, () => saveToStorage(this.state));
    };

    _onPressEnter(e) {
        if (e.key === 'Enter') {
            this._onSaveEditTask();
        }
    }

    _onBlureEditTask() {
        this._onSaveEditTask();
    }

    _onDeleteTask({e, itemId}) {
        e.preventDefault();
        const tasksList = [...this.state.tasksList];
        const tasklistWithoutTask = tasksList.filter(item => item.taskId !== itemId);
        this.setState({tasksList: tasklistWithoutTask}, () => saveToStorage(this.state));
    }


    render() {
        const tasksList = filterArray(this.state.tasksList, this.state.taskView);
        const tasks = tasksList.map((item, index) => {
            return (
                <div className={style.taskContainer} key={`${item.taskText}-${index}`}>
                    <div className={`${style.taskNumber} ${style.taskItem}`}>{index + 1}.</div>
                    <div className={`${style.taskText} ${style.taskItem}`}
                         onDoubleClick={(e) => this._onEditTask({e, taskId: item.taskId})}>
                        {item.isEdit
                            ? <InputText imputValue={this.state.editField}
                                         focus={true}
                                         action={this.editText}
                                         keyAction={this.pressEnter}
                                         blur={this.blur}/>
                            : item.taskText}
                    </div>
                    <div className={`${style.taskStatus} ${style.taskItem}`}>{item.taskStatus}</div>
                    {item.taskStatus === status.inProcess
                        ? <Button value={'Complete Task'} action={this.changeTaskStatus} itemId={item.taskId}/>
                        : <Button value={'Undo'} action={this.changeTaskStatus} itemId={item.taskId}/>}
                    <Button value={'Delete'} action={this.deleteTask} itemId={item.taskId}/>
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

        return (
            <div>
                <label htmlFor="textInput">Enter your task, please!
                    <InputText imputId={'textInput'}
                               imputValue={this.state.field}
                               action={this.typeText}/>
                </label>
                <Button value={'Add'} action={this.addTask}/>
                <div className={style.tasksContainer}>
                    {tasks}
                    <div className={`${style.tasksFilter}`}>
                        {filterButtons}
                    </div>
                </div>
            </div>
        );
    }
}

export default List