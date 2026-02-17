import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleLeft, 
  faFloppyDisk, 
  faTrashCan,
  faHeading,
  faClock,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../../../store/uiSlice'; 
import "./formGear.css";

function FormGear() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { taskid } = useParams();

    const task = useSelector(state => 
        state.ui.tasks.find(t => t.id === Number(taskid))
    );
// .
    const titleRef = useRef(null);
    const timeRef = useRef(null);
    const noteRef = useRef(null);

    const [charCount, setCharCount] = useState(0);
    const [timeError, setTimeError] = useState('');

    useEffect(() => {
        if (task) {
            if (titleRef.current) titleRef.current.value = task.title || '';
            if (timeRef.current) timeRef.current.value = task.time || '';
            if (noteRef.current) {
                noteRef.current.value = task.note || '';
                setCharCount((task.note || '').length);
            }
        }
    }, [task]);

    // Handle note character count
    const handleNoteChange = (e) => {
        setCharCount(e.target.value.length);
    };

    // Handle time validation
    const handleTimeChange = (e) => {
        const value = e.target.value.trim();
        if (value === '') {
            setTimeError('');
            return;
        }

        const timePattern = /^\d{1,2}:\d{2}\s*->\s*\d{1,2}:\d{2}$/;
        if (!timePattern.test(value)) {
            setTimeError('Use format: 00:00 -> 00:00');
        } else {
            setTimeError('');
        }
    };

    const goBackToTasks = () => {
        navigate("/tasks");
    };

    const saveTask = () => {
        const timeValue = timeRef.current.value.trim();
        
        // Verify time format
        const timePattern = /^\d{1,2}:\d{2}\s*->\s*\d{1,2}:\d{2}$/;

        if (timeValue !== "" && !timePattern.test(timeValue)) {
            alert("⚠️ Please use the correct format:\n00:00 -> 00:00\n\nExample: 09:00 -> 17:30");
            timeRef.current.focus();
            return;
        }

        // Save the task
        dispatch(updateTask({
            id: Number(taskid),
            title: titleRef.current.value || 'Untitled Task',
            time: timeValue,
            note: noteRef.current.value
        }));

        // Show success feedback
        const toast = document.createElement('div');
        toast.className = 'save-toast';
        toast.textContent = '✓ Task saved successfully!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
            navigate("/tasks");
        }, 1000);
    };

    const clearInputs = () => {
        const hasContent = titleRef.current.value || timeRef.current.value || noteRef.current.value;
        
        if (!hasContent) {
            alert("ℹ️ All inputs are already empty!");
            return;
        }

        if (window.confirm("⚠️ Clear all inputs?\n\nThis action cannot be undone.")) {
            titleRef.current.value = "";
            timeRef.current.value = "";
            noteRef.current.value = "";
            setCharCount(0);
            setTimeError('');
            titleRef.current.focus();
        }
    };

    // If task not found
    if (!task) {
        return (
            <div className="mom-formGear">
                <div className="full-formGear">
                    <div className="formGear-header">
                        <h2 className="formGear-title">Task Not Found</h2>
                        <p className="formGear-subtitle">The task you're looking for doesn't exist</p>
                    </div>
                    <div className="bottom-formGear">
                        <button className="icon-FormGear CircleLeft" onClick={goBackToTasks}>
                            <FontAwesomeIcon icon={faCircleLeft} />
                            <span style={{ marginLeft: '8px' }}>Back to Tasks</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='mom-formGear'>
            <div className='full-formGear'>
                {/* Header */}
                <div className="formGear-header">
                    <h2 className="formGear-title">Edit Task</h2>
                    <p className="formGear-subtitle">Update task details and settings</p>
                </div>

                {/* Form Fields */}
                <div className='top-formGear'>
                    {/* Title Field */}
                    <div className='field'>
                        <label>
                            <FontAwesomeIcon icon={faHeading} className="field-icon" />
                            TITLE
                        </label>
                        <input 
                            ref={titleRef} 
                            type="text"
                            placeholder="Enter task title..." 
                            maxLength="100"
                        />
                        <div className="field-helper">
                            <span>Give your task a clear, descriptive name</span>
                        </div>
                    </div>

                    {/* Time Field */}
                    <div className={`field ${timeError ? 'error' : ''}`}>
                        <label>
                            <FontAwesomeIcon icon={faClock} className="field-icon" />
                            TIME RANGE
                        </label>
                        <input 
                            type="text" 
                            ref={timeRef} 
                            placeholder="Example: 09:00 -> 17:30" 
                            onChange={handleTimeChange}
                        />
                        {timeError ? (
                            <div className="field-helper error">
                                ⚠️ {timeError}
                            </div>
                        ) : (
                            <div className="field-helper">
                                <span>Format: HH:MM -&gt; HH:MM (optional)</span>
                            </div>
                        )}
                    </div>

                    {/* Note Field */}
                    <div className='field'>
                        <label>
                            <FontAwesomeIcon icon={faStickyNote} className="field-icon" />
                            NOTES
                        </label>
                        <textarea 
                            className="input-note" 
                            ref={noteRef} 
                            placeholder="Add more details, requirements, or reminders..."
                            maxLength="500"
                            onChange={handleNoteChange}
                        ></textarea>
                        <div className="char-count">
                            {charCount} / 500 characters
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className='bottom-formGear'>
                    {/* Left side - Back button */}
                    <button className="icon-FormGear CircleLeft" onClick={goBackToTasks}>
                        <FontAwesomeIcon icon={faCircleLeft} />
                        <span style={{ marginLeft: '8px' }}>Back</span>
                    </button>
                    
                    {/* Right side - Save and Clear */}
                    <div className='Double-icons'>
                        <button
                            className='icon-FormGear TrashIcon' 
                            onClick={clearInputs}
                            title="Clear all fields"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button
                            className='icon-FormGear SaveIcon' 
                            onClick={saveTask}
                            title="Save changes"
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormGear;