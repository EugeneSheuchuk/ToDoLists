import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
});

export const API = {
    getUserLists() {
        return instance.get('main');
    },
    addList(listName) {
        return instance.post('main', {listName});
    },
    deleteList(listId) {
        return instance.delete('main', {data: {listId}});
    },
    updateListName(listId, newListName) {
        return instance.put('main', {listId, newListName})
    },
    getListTasks(listId) {
        return instance.get('tasks', {params: {listId}});
    },
    addNewTask(task) {
        return instance.post('tasks', {task});
    },
    changeTaskStatus(id, listId, taskId, currentStatus) {
        return instance.put(`tasks/${id}`, {listId, taskId, currentStatus});
    },
    changeTask(id, listId, taskId, newTaskText) {
        return instance.put(`tasks/editTask/${id}`, {listId, taskId, newTaskText});
    },
    deleteTask(listId, taskId) {
        return instance.delete('tasks', {data: {listId, taskId}});
    },
    isAuth() {
        return instance.get('auth/isAuth');
    },
    auth(fields){
        return instance.post('auth/auth', {...fields});
    },
    registartionUser(fields) {
        return instance.post('auth/registartion', {...fields});
    }
};