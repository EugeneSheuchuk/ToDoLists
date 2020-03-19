import {taskView, status} from './../components/list/List';

export function filterArray(array, condition) {
    const copy = [...array];
    if (condition === taskView.all) {
        return copy;
    } else if (condition === taskView.complete) {
        return copy.filter(item => item.taskStatus === status.complete);
    } else if (condition === taskView.inProgress) {
        return copy.filter(item => item.taskStatus === status.inProcess);
    } else {
        return array;
    }
}

export function saveToStorage(state, listId) {
    const updateState = {...state};
    const stateToString = JSON.stringify(updateState);
    localStorage.setItem(listId, stateToString);
}

export function saveToStorageMainData(state, id) {
    const mainState = {...state};
    const stateToString = JSON.stringify(mainState);
    localStorage.setItem(id, stateToString);
}