import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NewProjectButton from './components/NewProjectButton';
import ProjectSlider from './components/ProjectSlider';
import { retrieveProjects, saveProject, deleteProject } from './LocalStorage';

function App() {
    const [projects, setProjects] = useState(retrieveProjects());

    function createProject(newProject) {
        saveProject(newProject);
        setProjects([newProject, ...projects]);
    }

    function updateProject(project) {
        saveProject(project);
    }

    function destroyProject(id) {
        deleteProject(id);
        let i = projects.findIndex(p => p.id === id);
        let projectsCopy = [...projects];
        projectsCopy.splice(i, 1);
        setProjects(projectsCopy);
    }

    return (
        <React.Fragment>
            <NewProjectButton click={createProject} />
            <ProjectSlider
                projects={projects}
                actions={{ update: updateProject, destroy: destroyProject }}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.querySelector('.container'));
