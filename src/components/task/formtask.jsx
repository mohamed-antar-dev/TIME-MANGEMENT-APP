import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrashCan, 
  faCircleCheck, 
  faLock, 
  faGear, 
  faLockOpen, 
  faRepeat,
  faClock,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletTask, doneTask, toggleLock } from "../../store/uiSlice"; 
import "./formtask.css";

function FormTask({ task }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Delete task with confirmation
    const DeleteTask = () => {
        if (!task.locked) {
            const confirmDelete = window.confirm(
                `Are you sure you want to delete "${task.title || 'Untitled Task'}"?`
            );
            if (confirmDelete) {
                dispatch(deletTask(task.id));
            }
        }
    };

    // Toggle task done status
    const DoneTask = () => {
        if (!task.locked) {
            dispatch(doneTask(task.id));
        }
    };

    // Navigate to settings
    const GoToSettings = () => {
        if (!task.locked) {
            navigate(`/formGear/${task.id}`);
        }
    };

    // Toggle lock status
    const handleToggleLock = () => {
        dispatch(toggleLock(task.id));
    };

    // Determine task classes
    const taskClasses = [
        'FormTask',
        task.done ? 'task-done' : '',
        task.locked ? 'task-locked' : '',
    ].filter(Boolean).join(' ');

    return (
        <div className={taskClasses}>
            {/* Task Info Container */}
            <div className="task-info-container">
                {/* Title with checkbox */}
                <div className="task-title-wrapper">
                    <div 
                        className="task-checkbox"
                        onClick={DoneTask}
                        style={{ cursor: task.locked ? 'not-allowed' : 'pointer' }}
                    />
                    <input 
                        className="inputTask" 
                        type="text" 
                        value={task.title || "Untitled Task"} 
                        readOnly 
                    />
                </div>

                {/* Meta information */}
                {(task.time || task.note) && (
                    <div className="task-meta">
                        {task.time && (
                            <div className="task-time">
                                <FontAwesomeIcon icon={faClock} className="task-time-icon" />
                                <span>{task.time}</span>
                            </div>
                        )}
                        {task.note && (
                            <div 
                                className="task-note-indicator"
                                title={task.note}
                            >
                                <FontAwesomeIcon icon={faStickyNote} className="task-note-icon" />
                                <span>Has note</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Action Icons */}
            <div className="OptionTask">
                {/* Delete */}
                <div
                    className="task-icon icon-X" 
                    onClick={DeleteTask} 
                    style={{ cursor: task.locked ? 'not-allowed' : 'pointer' }}
                    title="Delete task"
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>

                {/* Done/Undo */}
                <div
                    className="task-icon icon-Check" 
                    onClick={DoneTask} 
                    style={{ cursor: task.locked ? 'not-allowed' : 'pointer' }}
                    title={task.done ? 'Mark as active' : 'Mark as done'}
                >
                    <FontAwesomeIcon icon={task.done ? faRepeat : faCircleCheck} />
                </div>

                {/* Lock/Unlock */}
                <div
                    className="task-icon icon-Lock" 
                    onClick={handleToggleLock} 
                    style={{ cursor: 'pointer' }}
                    title={task.locked ? 'Unlock task' : 'Lock task'}
                >
                    <FontAwesomeIcon icon={task.locked ? faLock : faLockOpen} />
                </div>

                {/* Settings */}
                <div
                    className="task-icon icon-Gear" 
                    onClick={GoToSettings} 
                    style={{ cursor: task.locked ? 'not-allowed' : 'pointer' }}
                    title="Edit task"
                >
                    <FontAwesomeIcon icon={faGear} />
                </div>
            </div>
        </div>
    );
}

export default FormTask;