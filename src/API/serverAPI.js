import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
});

export const API = {
    getDataById(id) {
        return instance.get(`main/${id}`);
    },
    addList(id, listName) {
        return instance.post(`main/${id}`, {listName});
    },
    deleteList(id, listId) {
        return instance.delete(`main/${id}`, {data: {listId}});
    },
    updateListName(id, listId, newListName) {
        return instance.put(`main/${id}`, {listId, newListName})
    },
    getListTasks(id, listId) {
        return instance.get('tasks', {params: {id, listId}});
    },
    addNewTask(id, task) {
        return instance.post(`tasks/${id}`, {task});
    },
    changeTaskStatus(id, listId, taskId, currentStatus) {
        return instance.put(`tasks/${id}`, {listId, taskId, currentStatus});
    },
    changeTask(id, listId, taskId, newTaskText) {
        return instance.put(`tasks/editTask/${id}`, {listId, taskId, newTaskText});
    },
    deleteTask(id, listId, taskId) {
        return instance.delete(`tasks/${id}`, {data: {listId, taskId}});
    }
};