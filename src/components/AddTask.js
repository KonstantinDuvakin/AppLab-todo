import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTasks, taskAdded} from "../features/tasksSlice";
import {nanoid} from "@reduxjs/toolkit";

export const AddTask = () => {
    const [text, setText] = useState('')
    const texts = useSelector(selectAllTasks)
    const dispatch = useDispatch()

    const existingTask = texts.find(el => el.text === text);

    const addTask = () => {
        if(text === '' || existingTask) return
        dispatch(taskAdded({id: nanoid(), text, done: false, date: new Date().toLocaleTimeString()}))
        setText('')
    }

    return (
        <div>
            <input className='form-control'
                   style={{marginBottom: 20}}
                   type="text"
                   placeholder="Type a task"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={addTask}>Add task</Button>
        </div>
    )
}
