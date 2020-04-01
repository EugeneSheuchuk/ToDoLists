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

export function checkComponentFields(state) {
    let error = {isError: false};
    for (let key in state) {
        let errorKey = `error${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (state[key].trim() === '') {
            error.isError = true;
            error[errorKey] = `${key} field cannot be empty`;
        } else {
            error[errorKey] = '';
        }
    }
    if (!error['errorEmail']) {
        if (state.email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== 0) {
            error.isError = true;
            error['errorEmail'] = 'error in email field';
        }
    }
    return error;
}