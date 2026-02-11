import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../../store/uiSlice'; 
import "./formGear.css";

function FormGear() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { taskid } = useParams();

    
    const task = useSelector(state => 
        state.ui.tasks.find(t => t.id === Number(taskid))
    );

    const titleRef = useRef(null);
    const timeRef = useRef(null);
    const noteRef = useRef(null);

    useEffect(() => {
        if (task) {
            if (titleRef.current) titleRef.current.value = task.title || '';
            if (timeRef.current) timeRef.current.value = task.time || '';
            if (noteRef.current) noteRef.current.value = task.note || '';
        }
    }, [task]);

    const goBackToTasks = () => {
        navigate("/tasks");
    };

    const saveTask = () => {
        const timeValue = timeRef.current.value.trim();
        
       // verification of form of time
        const timePattern = /^\d{1,2}:\d{2}\s*->\s*\d{1,2}:\d{2}$/;

        // fct how show the alert if the form of time is not correct
        if (timeValue !== "" && !timePattern.test(timeValue)) {
            alert("Please use the correct format : 00:00 -> 00:00");
            timeRef.current.focus();
            return;
        }

        dispatch(updateTask({
            id: Number(taskid),
            title: titleRef.current.value,
            time: timeValue,
            note: noteRef.current.value
        }));
        navigate("/tasks");
    };
// fct to clear all inputs of the formGear ( settings ) and show alert to confirm the action
    const clearInputs = () => {
        if (!titleRef.current.value && !timeRef.current.value && !noteRef.current.value) {
            alert("ALL INPUTS ARE ALREADY EMPTY!");
            return;
        }

        if (window.confirm("ARE YOU SURE YOU WANT TO CLEAR ALL INPUTS?")) {
            if (window.confirm("FOR THE SECOND TIME. ARE YOU SURE?")) {
                titleRef.current.value = "";
                timeRef.current.value = "";
                noteRef.current.value = "";
                titleRef.current.focus();
            }
        }
    };

    return (
        <div className='mom-formGear'>
            <div className='full-formGear'>

{/* the first part  where we find inputs  */}
                <div className='top-formGear'>

{/* field of the title ( input )*/}
                    <div className='field'>
                        <label>TITLE :</label>
                        <input ref={titleRef} placeholder="Enter task title..." />
                    </div>

{/* field of the Time */}
                    <div className='field'>
                        <label>TIME (START  ---  END) :</label>
                        <input 
                            type="text" 
                            ref={timeRef} 
                            placeholder="example : 12:10 -> 14:30" 
                        />
                    </div>

{/* field of the Note*/}
                    <div className='field'>
                        <label>NOTE :</label>
                        <textarea 
                            className="input-note" 
                            ref={noteRef} 
                            placeholder="Add more details..."
                        ></textarea>
                    </div>

                </div>

{/* the second part  where we find icons  */}
                <div className='bottom-formGear'>

                    {/* icon Clear all  +  icon Save input context  */}
                    <div className='Double-icons'>
                        <FontAwesomeIcon 
                            className='icon-FormGear TrashIcon' 
                            onClick={clearInputs}
                            icon={faTrashCan} 
                        />
                        <FontAwesomeIcon 
                            className='icon-FormGear SaveIcon' 
                            onClick={saveTask} 
                            icon={faFloppyDisk} 
                        />
                    </div>
                    
                    {/*   icon to go back to tasks   */}
                    <div className='buttonBack'>
                        <FontAwesomeIcon 
                            className="icon-FormGear CircleLeft" 
                            onClick={goBackToTasks} 
                            icon={faCircleLeft} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormGear;