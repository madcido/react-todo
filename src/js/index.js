import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { Dispatch, reducer } from './reducer';
import NewProjectButton from './components/NewProjectButton';
import Slider from './components/Slider';
import { retrieveProjects } from './LocalStorage';
import '../styles/main.css';


function App() {
    const [state, dispatch] = useReducer(reducer, { projects: retrieveProjects() });

    return (
        <Dispatch.Provider value={dispatch}>
            <NewProjectButton />
            <Slider data={state.projects} />
        </Dispatch.Provider>
    )
}

ReactDOM.render(<App />, document.querySelector('.container'));
