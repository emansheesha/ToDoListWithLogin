import { Card } from 'antd';
import React from 'react';
import {
    Button, Input
} from 'antd';
import './mainCard.css';
import { useAuth } from '../Auth';
import { useState } from 'react';
const MainCard = () => {
    const [task, setTask] = useState('')
    const [deleteSection, setDeleteSection] = useState(false);
    const auth = useAuth();
    console.log(auth.toDoList);
    const handleInput = (e) => {
        setTask(e.target.value);
    }
    const handleClick = () => {
        if (task) {
            auth.addNewTask(task)
            setTask('')
        }
        else {
            alert('enter a valid value')
        }
    }
    const handleDeleteSection = () => {
        if (auth.handleDeleteSection()) setDeleteSection(true)
        else setDeleteSection(false)
    }
    return (
        <>
            {true && <Card
                style={{
                    width: 350,
                }}

            >
                <i className="fa fa-trash delete-section-icon" onClick={handleDeleteSection}></i>
                <Input.Group compact>
                    <Input style={{ width: 'calc(100% - 65px)' }} value={task}
                        onChange={(e) => handleInput(e)} />
                    <Button type="primary" onClick={handleClick} >
                        Enter</Button>
                </Input.Group>
                <br />
                {auth.toDoList.map(todo => {
                    return (
                        <p key={todo.id} className="task-container">
                            <span>{todo.task}</span>
                            <span onClick={() => { auth.handleDelete(todo.id) }} >
                                <i className="fa fa-trash delete-icon"></i>
                            </span>
                        </p>

                    )
                })}
            </Card>
            }
        </>
    );
}
export default MainCard;