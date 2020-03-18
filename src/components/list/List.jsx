import React from 'react';
import style from './List.module.css';

const status = {
    complete: 'COMPLETE',
    inProcess: 'INPROCESS',
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: 0,
            field: '',
            tasksList: [],
        };
    };

    _onTypeText(e) {
        const newText = e.target.value;
        this.setState({field: newText});
    };

    _addTask(e) {
        e.preventDefault();
        const task = {
            taskId: this.state.taskId,
            taskText: this.state.field,
            taskStatus: status.inProcess,
        };
        const taskId = this.state.taskId + 1;
        const tasksList = [...this.state.tasksList];
        tasksList.push(task);
        this.setState({
            taskId, field: '', tasksList,
        });
    };

    render() {
        console.log(this.state);
        const tasks = this.state.tasksList.map((item, index) => {
            return (
                <div className={style.taskContainer} key={`${item.taskText}-${index}`}>
                    <div className={`${style.taskNumber} ${style.taskItem}`}>{index + 1}.</div>
                    <div className={`${style.taskText} ${style.taskItem}`}>{item.taskText}</div>
                    <div className={`${style.taskStatus} ${style.taskItem}`}>{item.taskStatus}</div>
                </div>
            );
        });

        return (
            <div>
                <label htmlFor="textInput">Enter your task, please!
                    <input type="text"
                           id="textInput"
                           value={this.state.field}
                           onChange={(e) => this._onTypeText(e)}/>
                    <input type="button" value="Add" onClick={(e) => this._addTask(e)}/>
                </label>
                <div className={style.tasksContainer}>
                    {tasks}
                </div>
            </div>
        );
    }
}

export default List