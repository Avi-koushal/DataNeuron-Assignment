import './App.css';
import Resizeable from './Components/Resizeable'
import List from './TaskSecond/List'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Resizeable/> */}
      {/* <List/> */}
      <Router>
      <Routes>
        <Route exact path="/" Component={Resizeable}></Route>
        <Route exact path="/List" Component={List}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
