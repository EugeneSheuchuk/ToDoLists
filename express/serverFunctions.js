const sessionStorage = {};

function isUserAuth(cookies) {
    return sessionStorage[cookies.todoList] !== undefined;
}

function setUserSession(field, userId) {
    sessionStorage[field] = userId;
    console.log('serverFunctions sessionStorage', sessionStorage);
}

function checkRequestFields(fields) {
    let error = {isError: false};
    for (let key in fields) {
        let errorKey = `error${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (fields[key].trim() === '') {
            error.isError = true;
            error[errorKey] = `${key} field cannot be empty`;
        } else {
            error[errorKey] = '';
        }
    }
    if (!error['errorEmail']) {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(fields.email)) {
            error.isError = true;
            error.errorEmail = 'error in email field';
        }
    }
    return error;
}

const appUsers = {};

function createUser(userId) {
    appUsers[userId] = true;
}

function checkReqId(req) {
    return !(appUsers[req.params.id]) && !(appUsers[req.query.id])
}

module.exports = {
    appUsers,
    createUser,
    checkReqId,
    isUserAuth,
    setUserSession,
    checkRequestFields,
    sessionStorage
};