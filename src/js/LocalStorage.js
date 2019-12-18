const getUniqueId = (str) => {
    const type = str + '_id';
    if (localStorage[type]) {
        localStorage[type]++;
    } else {
        localStorage[type] = 1;
    }
    return localStorage[type];
}

const retrieveProjects = () => {
    let projects = localStorage['projects'];
    if (projects) {
        return JSON.parse(projects);
    } else {
        const defaultProject = {
            id: getUniqueId('project'),
            title: 'Default',
            todos: [],
        };
        saveProject(defaultProject);
        return [defaultProject];
    }
}

const saveProject = (project) => {
    let projects = localStorage['projects'];
    if (projects) {
        projects = JSON.parse(localStorage['projects']);
        let index = projects.findIndex(p => p.id === project.id);
        if (index === -1) {
            projects.unshift(project);
        } else {
            projects[index] = project;
        }
        localStorage['projects'] = JSON.stringify(projects);
    } else {
        localStorage['projects'] = JSON.stringify([project]);
    }
}

const deleteProject = (projectId) => {
    let projects = localStorage['projects'];
    if (projects) {
        projects = JSON.parse(localStorage['projects']);
        let index = projects.findIndex(p => p.id === projectId);
        projects.splice(index, 1);
        localStorage['projects'] = JSON.stringify(projects);
    }
}

export { getUniqueId, retrieveProjects, saveProject, deleteProject };
