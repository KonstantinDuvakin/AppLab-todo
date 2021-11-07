import React from "react";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {selectAllTasks} from "../features/tasksSlice";

export const TaskList = () => {
    const tasks = useSelector(selectAllTasks)

    return tasks.slice().sort((a, b) => b.date.localeCompare(a.date)).map(el => <Task key={el.id} task={el} />)
}

