import './App.css';
import Navbar from './components/Navbar'
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favorite from './components/Favorite';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Banner/>
      <Movies/> */}
      <Favorite/>
    </div>
  );
}

export default App;
