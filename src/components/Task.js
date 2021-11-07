import React, {useState} from "react";
import {Button} from "react-bootstrap";
import Edit from "../assets/edit_black_24dp.svg";
import Delete from "../assets/clear_black_24dp.svg";
import Save from "../assets/save_black_24dp.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectTaskById, taskDeleted, taskDone, taskEdited} from "../features/tasksSlice";

export const Task = ({task}) => {
    const [isChecked, setIsChecked] = useState(task.done)
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(task.text)

    const taskId = useSelector(state => selectTaskById(state, task.id))

    const dispatch = useDispatch();

    const onSave = () => {
        dispatch(taskEdited({id: task.id, text, date: new Date().toTimeString()}))
        setIsEditing(false)
    }

    const onDelete = () => {
        dispatch(taskDeleted(taskId))
    }

    const onDone = () => {
        // setIsChecked(e.target.checked)
        // dispatch(taskDone({id: taskId, done: !isChecked}))
    }

    return (
        <div style={{
            height: 50,
            padding: 10,
            marginBottom: 10,
            border: '1px solid #bdbdbd',
            borderRadius: 5,
            position: 'relative'
        }}
             className='d-flex col-md-12 justify-content-between align-items-center'>
            {
                isEditing &&
                <>
                    <input className='col-md-8'
                           value={text}
                           onChange={e => setText(e.target.value)}
                    />
                    <Button style={{padding: 0, background: 'none', border: 'none', color: '#333'}} onClick={onSave}>
                        <img src={Save} alt="Save"/>
                    </Button>
                </>
            }
            {
                !isEditing &&
                <>
                    <input type="checkbox" className='done' checked={isChecked}
                           defaultChecked={isChecked}
                           onChange={e => setIsChecked(e.target.checked)}/>
                    <div className='col-md-8'>{task.text}</div>

                    {
                        isChecked && <span className='d-flex position-absolute justify-content-center w-100'>Выполнено!</span>
                    }

                    <div>{task.date}</div>
                    <Button style={{padding: 0, background: 'none', border: 'none'}}
                            onClick={() => setIsEditing(true)}
                            disabled={isChecked}
                    >
                        <img src={Edit} alt="Edit"/>
                    </Button>
                    <Button style={{padding: 0, background: 'none', border: 'none'}}
                            onClick={onDelete}
                    >
                        <img src={Delete} alt="Delete"/>
                    </Button>
                </>
            }
        </div>
    )
}
