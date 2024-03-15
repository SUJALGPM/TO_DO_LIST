const mongoose = require('mongoose');

//Configure the TaskModel...
const TodoSchema = new mongoose.Schema({
    task: {
        type: "String",
        required: false
    },
    isComplete: {
        type: Boolean,
        default: false

    },
    Date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear();
            return `${day}/${month}/${year}`;
        }
    },
    Time: {
        type: String,
        default: () => {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            const seconds = currentTime.getSeconds().toString().padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
    }
}, { timestamps: true });


const TodoModel = mongoose.model('TodoData', TodoSchema);
module.exports = TodoModel;