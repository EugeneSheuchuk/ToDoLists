import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const API = {
    getDataById(id) {
        return instance.get(`list/${id}`);
    },
    addList(id, listName) {
        return instance.post(`/addList/${id}`,{listName});
    },
    deleteList(id, listId) {
        return instance.delete(`/deleteList/${id}`, {data: {listId}});
    },
    updateListName(id, listId, newListName) {
        return instance.put(`/updateListName/${id}`, {listId, newListName})
    }
};