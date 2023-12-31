import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Create } from './pages/create';
import { Saved } from './pages/saved';
import { Navbar } from './components/navbar';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-recipe" element={<Create />} />
            <Route path="/saved-recipe" element={<Saved />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
