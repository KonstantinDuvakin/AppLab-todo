import './App.css';
import {Header} from "./components/Header";
import {AddTask} from "./components/AddTask";
import {TaskList} from "./components/TaskList";

function App() {

    return (
        <>
            <Header />
            <div className="container">
                <AddTask />
                <hr/>
                <TaskList />
            </div>
        </>
    );
}

export default App;
