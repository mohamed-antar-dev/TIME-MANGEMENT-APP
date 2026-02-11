import { createSlice } from "@reduxjs/toolkit";


const loadTasksFromLocalStorage = () => {
    try {
        const serializedTasks = localStorage.getItem("myTasks");
        if (!serializedTasks || serializedTasks === "undefined") return []; 
        return JSON.parse(serializedTasks);
    } catch (e) {
        console.error("Error loading tasks:", e);
        return []; 
    }
};

const saveToLocalStorage = (tasks) => {
    try {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
    } catch (e) {
        console.error("Error saving tasks:", e);
    }
};

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        showTask: false,
        lockTask: false,
        infoTask: false,
        tasks: loadTasksFromLocalStorage(),
    },
    reducers: {
        createTask: (state) => {
            if (state.tasks.length >= 6) {
                alert("You can't create more than 6 tasks.");
                return; 
            }
            state.tasks.push({
                id: Date.now(),
                title: "",
                time: "",
                note: "",
                done: false,
                locked: false,
            });
            state.showTask = true;
            saveToLocalStorage(state.tasks);
        },
        deletTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveToLocalStorage(state.tasks);
        },
        doneTask: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.done = !task.done;
                saveToLocalStorage(state.tasks);
            }
        },
        toggleLock: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.locked = !task.locked;
                saveToLocalStorage(state.tasks);
            }
        },
        updateTask: (state, action) => {
            const { id, title, time, note } = action.payload;
            const task = state.tasks.find(t => t.id === Number(id));
            if (task) {
                task.title = title;
                task.time = time;
                task.note = note;
                saveToLocalStorage(state.tasks);
            }
        }
    }
});

export const { createTask, deletTask, doneTask, toggleLock, updateTask } = uiSlice.actions;
export default uiSlice.reducer;