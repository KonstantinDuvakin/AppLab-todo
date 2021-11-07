import {createSlice} from "@reduxjs/toolkit";


const initialState = []

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action) {
            state.push(action.payload)
        },
        taskEdited(state, action) {
            const {id, text, date} = action.payload;

            const existTask = state.find(task => task.id === id);
            if (existTask) {
                existTask.text = text;
                existTask.date = date;
            }
        },
        taskDeleted(state, action) {
            return state.filter(task => task.id !== action.payload.id)
        },
        taskDone(state, action) {
            console.log(action.payload)
            const existTask = state.find(task => task.id === action.payload.id)
            if(existTask) {
                existTask.done = action.payload.done
            }
        }
    }
})

export const {taskAdded, taskEdited, taskDeleted, taskDone} = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = state => state.tasks;

export const selectTaskById = (state, taskId) => state.tasks.find(task => task.id === taskId)
