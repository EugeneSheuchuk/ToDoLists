const mongoose = require('mongoose');
const List = require('./list');

module.exports = {
    connectDB() {
        mongoose.connect('mongodb://localhost:27017/todolists',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('mongoDB connected'))
            .catch(err => console.log('mongoDB was not connect ', err));
    },
    getData() {
        return List.find();
    },
    async addList(listName) {
        try {
            const newList = new List({
                listName,
                tasks: []
            });
            await newList.save();
            return true;
        } catch (e) {
            return false;
        }
    },
    async deleteList(id) {
        try {
            await List.findOneAndDelete({_id: id});
            return true;
        } catch(e) {
            return false;
        }
    },
    async changeListName(id, newName) {
        try {
            await List.updateOne({_id: id}, {listName: newName});
            return true;
        } catch (e) {
            return false;
        }
    },
};