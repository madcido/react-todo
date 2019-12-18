import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NewProjectButton from './components/NewProjectButton';
import ProjectSlider from './components/ProjectSlider';
import { retrieveProjects, saveProject, deleteProject } from './LocalStorage';

function App() {
    const [projects, setProjects] = useState(retrieveProjects());

    function createProject(newProject) {
        saveProject(newProject);
        setProjects(retrieveProjects());
    }

    function updateProject(project) {
        saveProject(project);
        setProjects(retrieveProjects());
    }

    function destroyProject(projectId) {
        deleteProject(projectId);
        setProjects(retrieveProjects());
    }

    return (
        <React.Fragment>
            <NewProjectButton click={createProject} />
            <ProjectSlider projects={projects} actions={{ update: updateProject, destroy: destroyProject }} />
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.querySelector(".container"));
