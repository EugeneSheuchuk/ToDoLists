let listId = 0;

const appUsers = {};

function createUser(userId) {
    appUsers[userId] = {
        lists: [],
    };
}

function createList(listName) {
    const list = {
        listId: listId,
        listName: listName,
    };
    listId += 1;
    return list;
}

function deleteList(lists, listId) {
    const copy = [...lists];
    return copy.filter(item => item.listId !== listId);
}

function updateListName(lists, listId, newName) {
    const copy = [...lists];
    return copy.map(item => {
        if (item.listId === listId) {
            item.listName = newName;
            return item;
        } else {
            return item;
        }
    });
}

module.exports = {
    appUsers: appUsers,
    createUser: createUser,
    createList: createList,
    deleteList: deleteList,
    updateListName: updateListName
};