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
};