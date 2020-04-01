const sessionStorage = {};

function isUserAuth(cookies) {
    return sessionStorage[cookies.todoList] !== undefined;
}
function setUserSession(field, userId) {
    sessionStorage[field] = userId;
    console.log('serverFunctions sessionStorage', sessionStorage);
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
    setUserSession
};