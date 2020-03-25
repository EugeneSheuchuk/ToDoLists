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
        const newList = new List({
            _id: mongoose.Types.ObjectId(),
            listName,
            tasks: []
        });
        await newList.save();
        return this.getData();
    }
};