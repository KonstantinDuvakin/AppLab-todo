import React, {useState} from "react";
import style from './Task.module.css'
import {Button} from "react-bootstrap";
import Edit from "../assets/edit_black_24dp.svg";
import Delete from "../assets/clear_black_24dp.svg";
import Save from "../assets/save_black_24dp.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectAllTasks, selectTaskById, taskDeleted, taskDone, taskEdited} from "../features/tasksSlice";

export const Task = ({task}) => {
    const [isChecked, setIsChecked] = useState(task.done)
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(task.text)

    const texts = useSelector(selectAllTasks)
    const taskId = useSelector(state => selectTaskById(state, task.id))
    const existingTask = texts.find(el => el.text === text);

    const dispatch = useDispatch();

    const onSave = () => {
        if(text === '' || existingTask) return
        dispatch(taskEdited({id: taskId.id, text, date: new Date().toLocaleTimeString()}))
        setIsEditing(false)
    }

    const onDelete = () => {
        dispatch(taskDeleted(taskId))
    }

    const onDone = (e) => {
        setIsChecked(e.target.checked)
        dispatch(taskDone({id: taskId.id, done: !isChecked}))
    }

    return (
        <div className={style.taskDiv}>
            {
                isEditing &&
                <>
                    <input className='col-md-8 border-0'
                           value={text}
                           onChange={e => setText(e.target.value)}
                    />
                    <Button className={style.changeButton} onClick={onSave}>
                        <img src={Save} alt="Save"/>
                    </Button>
                </>
            }
            {
                !isEditing &&
                <>
                    <div className='col-md-10 d-flex justify-content-start'>
                        <div className='col-md-8 d-flex align-items-center'>
                            <input type="checkbox"
                                   className='done col-md-1'
                                   checked={isChecked}
                                   onChange={onDone}
                            />
                            <div className={isChecked ? 'col-md-11 text-decoration-line-through' : 'col-md-11'}>{task.text}</div>
                        </div>
                        {
                            taskId.done && <div className='col-md-4'><span className='d-flex justify-content-center text-success'>Выполнено!</span></div>
                        }
                    </div>

                    <div className='col-md-2 d-flex justify-content-between align-items-center'>
                        <div>{task.date}</div>
                        <Button className={style.changeButton}
                                onClick={() => setIsEditing(true)}
                                disabled={isChecked}
                        >
                            <img src={Edit} alt="Edit"/>
                        </Button>
                        <Button className={style.changeButton}
                                onClick={onDelete}
                        >
                            <img src={Delete} alt="Delete"/>
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}
