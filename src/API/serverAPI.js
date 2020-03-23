import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const API = {
    getDataById(id) {
        return instance.get(`main/${id}`);
    },
    addList(id, listName) {
        return instance.post(`main/${id}`,{listName});
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
    addNewTask(id, listId, task) {
        return instance.post(`tasks/${id}`, {listId, task});
    }
};