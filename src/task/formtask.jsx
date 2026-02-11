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
// fct to confirme the delete of the task and show the Title of the task by using alert
    const DeleteTask = () => {
    if (!task.locked) {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the task "${task.title || 'Untitled Task'}"?`
        );
        if (confirmDelete) {
            dispatch(deletTask(task.id));
        }
    }
};
// fct to change the state of the task  is ( done or not )
    const DoneTask = () => {
        if (!task.locked) {
            dispatch(doneTask(task.id));
        }
    };
// fct to go to the formGear to edit the info of task 
    const GoToSettings = () => {
        if (!task.locked) {
            navigate(`/formGear/${task.id}`);
        }
    };

    return (
        <div 
            className="FormTask" 
            // style of the task if it's done or not and if it's locked or not
            style={{
                backgroundColor: task.done ? "#02b44c" : "rgb(0, 0, 0)", 
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
            
            {/* icons to controle the task  state */}

            {/* icon of delete ( X ) */}
            <div className="OptionTask">
                <FontAwesomeIcon 
                    className="task-icon icon-X" 
                    onClick={DeleteTask} 
                    style={{ cursor: task.locked ? "not-allowed" : "pointer", color: "#ff1900", margin: "0 10px" }} 
                    icon={faTrashCan} 
                />
            {/* icon of is the task is done or not */}    
                <FontAwesomeIcon 
                    className="task-icon icon-Check" 
                    onClick={DoneTask} 
                    style={{ cursor: task.locked ? "not-allowed" : "pointer" ,color:task.done ? "black" : "#39d834", margin: "0 10px" }} 
                    icon={task.done? faRepeat : faCircleCheck} 
                />
            {/* icon of is the task is lock */}   
                <FontAwesomeIcon 
                    className="task-icon icon-Lock" 
                    onClick={() => dispatch(toggleLock(task.id))} 
                    style={{ cursor: "pointer", margin: "0 10px" }} 
                    icon={task.locked ? faLock : faLockOpen}  
                />
             {/* icon of the formGear ( Settings of the task )*/}     
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