import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import NewProjectButton from './components/NewProjectButton';
import Slider from './components/Slider';
import { retrieveProjects, saveProject, deleteProject } from './LocalStorage';
import '../styles/main.css';

function App() {
    const [projectList, setProjectList] = useState(retrieveProjects());

    function createProject(newProject) {
        saveProject(newProject);
        setProjectList([newProject, ...projectList]);
    }

    function destroyProject(id) {
        deleteProject(id);
        let i = projectList.findIndex(p => p.id === id);
        let projectListCopy = [...projectList];
        projectListCopy.splice(i, 1);
        setProjectList(projectListCopy);
    }

    return (
        <React.Fragment>
            <NewProjectButton click={createProject} />
            <Slider
                data={projectList}
                actions={{ update: saveProject, destroy: destroyProject }}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.querySelector('.container'));
