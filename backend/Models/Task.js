import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    completed: {type: Boolean, required: true},
    selected: {type: Boolean, required: true}
});

export default mongoose.model('Task', taskSchema);