import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../store/uiSlice";
import { FaPlus, FaClipboardList, FaCheckCircle, FaClock } from "react-icons/fa";
import "./Tasks.css";
import FormTask from "../task/Formtask";

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.ui.tasks);
  
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'done'
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const active = total - done;
    return { total, done, active };
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by status
    if (filter === 'done') {
      filtered = filtered.filter(t => t.done);
    } else if (filter === 'active') {
      filtered = filtered.filter(t => !t.done);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(t => 
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.note?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, filter, searchQuery]);

  const handleCreateTask = () => {
    dispatch(createTask());
  };

  return (
    <div className="tasks-page">
      {/* Header */}
      <div className="tasks-header">
        <h1 className="tasks-title">My Tasks</h1>
        <p className="tasks-subtitle">Organize your work, achieve your goals</p>
        
        {/* Stats */}
        <div className="tasks-stats">
          <div className="stat-badge">
            <FaClipboardList className="stat-icon" />
            <span className="stat-number">{stats.total}</span>
            <span>Total</span>
          </div>
          <div className="stat-badge">
            <FaCheckCircle className="stat-icon" />
            <span className="stat-number">{stats.done}</span>
            <span>Done</span>
          </div>
          <div className="stat-badge">
            <FaClock className="stat-icon" />
            <span className="stat-number">{stats.active}</span>
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      {tasks.length > 0 && (
        <div className="tasks-filters">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'done' ? 'active' : ''}`}
              onClick={() => setFilter('done')}
            >
              Completed
            </button>
          </div>
          
          <div className="filter-search">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Tasks Container */}
      <div className="tasks-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <FormTask key={task.id} task={task} />
          ))
        ) : tasks.length === 0 ? (
          // Empty state - no tasks at all
          <div className="tasks-empty">
            <div className="empty-icon">
              <FaClipboardList />
            </div>
            <h2 className="empty-title">No Tasks Yet</h2>
            <p className="empty-text">
              Create your first task and start organizing your work efficiently
            </p>
            </div>
        ) : (
          // Empty state - filtered results
          <div className="tasks-empty">
            <div className="empty-icon">
              <FaClipboardList />
            </div>
            <h2 className="empty-title">No Tasks Found</h2>
            <p className="empty-text">
              {searchQuery ? 
                `No tasks match "${searchQuery}"` : 
                `No ${filter} tasks at the moment`
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Button */}
      <button
        className="buttonCreate"
        onClick={handleCreateTask}
        aria-label="Create new task"
      >
        <FaPlus className="button-icon" />
      </button>
    </div>
  );
}

export default Tasks;