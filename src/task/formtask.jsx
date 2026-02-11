import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleCheck, faLock, faGear, faLockOpen , faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletTask, doneTask, toggleLock  } from "../store/uiSlice"; 
import "./formtask.css";

function FormTask({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const DeleteTask = () => {
        if (!task.locked) {
            dispatch(deletTask(task.id));
        }
    };

    const DoneTask = () => {
        if (!task.locked) {
            dispatch(doneTask(task.id));
        }
    };

    const GoToSettings = () => {
        if (!task.locked) {
            navigate(`/formGear/${task.id}`);
        }
    };

    return (
        <div 
            className="FormTask" 
            style={{
                backgroundColor: task.done ? "#14b959" : "rgb(0, 0, 0)", 
                border: task.locked ? "4px solid gold" : "3px solid white",
                cursor: task.locked ? "not-allowed" : "default",
                opacity: task.locked ? "0.7" : "1",
               
                
            
            }}
        >
            <div className="task-info-container" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <input 
                    className="inputTask" 
                    type="text" 
                    value={task.title || "Untitled Task"} 
                    readOnly 
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "1.1rem",
                        outline: "none",
                       
                    }}
                />
                {task.time && (
                    <small style={{ color: "#ffffff", marginTop: "4px" }}>
                        Time: {task.time} h
                    </small>
                )}
            </div>
            
            {/* button to controle the task*/}
            <div className="OptionTask">
                <FontAwesomeIcon 
                    className="task-icon icon-X" 
                    onClick={DeleteTask} 
                    style={{ cursor: task.locked ? "not-allowed" : "pointer", color: "#ff1900", margin: "0 10px" }} 
                    icon={faTrashCan} 
                />
                <FontAwesomeIcon 
                    className="task-icon icon-Check" 
                    onClick={DoneTask} 
                    style={{ cursor: task.locked ? "not-allowed" : "pointer" ,color:task.done ? "black" : "#39d834", margin: "0 10px" }} 
                    icon={task.done? faRepeat : faCircleCheck} 
                />
                <FontAwesomeIcon 
                    className="task-icon icon-Lock" 
                    onClick={() => dispatch(toggleLock(task.id))} 
                    style={{ cursor: "pointer", margin: "0 10px" }} 
                    icon={task.locked ? faLock : faLockOpen}  
                />
                <FontAwesomeIcon  
                    className="task-icon icon-Gear" 
                    onClick={GoToSettings} 
                    style={{ cursor: task.locked ? "not-allowed" : "pointer", margin: "0 10px" }}
                    icon={faGear} 
                /> 
            </div>
            
        </div>
    );
}

export default FormTask;