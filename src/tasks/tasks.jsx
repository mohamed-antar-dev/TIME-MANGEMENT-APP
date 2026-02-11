import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../store/uiSlice";
import "./tasks.css";
import FormTask from "../task/Formtask";

function Tasks() {
  const dispatch = useDispatch();
  
  const tasks = useSelector(state => state.ui.tasks);

  return (
    <>
      <button
        className="buttonCreate"
        onClick={() => dispatch(createTask())}
      >
        + CREATE NEW OBJECTIF
      </button>

      <div className="tasks-container">
        { tasks.map(task => (
          <FormTask key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}

export default Tasks;
