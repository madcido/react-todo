import React from 'react';
import { saveProject, deleteProject } from './LocalStorage';

const Dispatch = React.createContext(null);

function reducer(state, action) {
    let projects = [...state.projects];
    let i = projects.findIndex(project => project.id === action.id);
    switch (action.type) {
        case 'ADD_PROJECT':
            projects.unshift(action.payload);
            saveProject(action.payload);
            return { projects };
        case 'UPDATE_PROJECT':
            projects[i] = { ...projects[i], ...action.payload };
            saveProject(projects[i]);
            return { projects };
        case 'DELETE_PROJECT':
            projects.splice(i, 1);
            deleteProject(action.id);
            return { projects };
    }
}

export { Dispatch, reducer };
export default Dispatch;
