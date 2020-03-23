const appUsers = {};


function createUser(userId) {
    appUsers[userId] = {
        lists: [],
    };
}

function createList(id, listName) {
    return {
        listId: id,
        listName: listName,
        tasks: [],
    };
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

function getListTasks(lists, listId) {
    const copy = [...lists];
    let tasks = [];
    copy.forEach(item => {
        if (item.listId === listId) {
            tasks = [...item.tasks];
        }
    });
    return tasks;
}

function addTask(lists, listId, task) {
    const copy = [...lists];
    copy.forEach(item => {
        if (item.listId === listId) {
            item.tasks = [...item.tasks, task];
        }
    });
    return copy;
}




function generateId() {
    let id = 0;
    return function(name) {
        const gId = `${name}-${id}`;
        id += 1;
        return gId;
    }
}


module.exports = {
    appUsers: appUsers,
    createUser: createUser,
    createList: createList,
    deleteList: deleteList,
    updateListName: updateListName,
    getListTasks: getListTasks,
    generateId: generateId,
    addTask: addTask
};