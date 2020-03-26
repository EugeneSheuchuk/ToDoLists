const status = {
    complete: 'Complete',
    inProcess: 'In progress',
};
const appUsers = {};


function createUser(userId) {
    appUsers[userId] = true;
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

function changeTaskStatus(lists, listId, taskId) {
    const copy = [...lists];
    copy.forEach(item => {
        if (item.listId === listId) {
            const tasksCopy = [...item.tasks];
            tasksCopy.forEach(i => {
                if (i.taskId === taskId) {
                    i.taskStatus = i.taskStatus === status.inProcess ? status.complete : status.inProcess;
                }
            });
            item.tasks = [...tasksCopy];
        }
    });
    return copy;
}

function deleteTask(lists, listId, taskId) {
    const copy = [...lists];
    copy.forEach(item => {
        if (item.listId === listId) {
            const tasksCopy = [...item.tasks];
            item.tasks = [...tasksCopy.filter(i => i.taskId !== taskId)];
        }
    });
    return copy;
}

function updateTaskText(lists, listId, taskId, newTaskText) {
    const copy = [...lists];
    copy.forEach(item => {
        if (item.listId === listId) {
            const tasksCopy = [...item.tasks];
            tasksCopy.forEach(i => {
                if (i.taskId === taskId) {
                    i.taskText = newTaskText;
                }
            });
        }
    });
    return copy;
}

function checkReqId(req) {
    return !(appUsers[req.params.id])
}


function generateId() {
    let id = 0;
    return function (name) {
        const gId = `${name}-${id}`;
        id += 1;
        return gId;
    }
}


module.exports = {
    appUsers,
    createUser,
    createList,
    deleteList,
    updateListName,
    getListTasks,
    generateId,
    addTask,
    changeTaskStatus,
    deleteTask,
    updateTaskText,
    checkReqId
};