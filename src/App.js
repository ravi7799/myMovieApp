import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar'
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favorite from './components/Favorite';

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" exact element={(<><Banner/><Movies/></>)}/>
          <Route path="/favourite" element={<Favorite/>}/>
        </Routes>
    </Router>
  );
}

export default App;
