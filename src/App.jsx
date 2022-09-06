import './App.css'
import { Routes, Route } from "react-router-dom";
import HomeScreen from './HomeScreen';
import GiphyScreen from './GiphyScreen';

const App = () => {
  return (
    <div className='App'>
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/giphy/:id" element={<GiphyScreen />} />
        </Routes>
    </div>
  )
}

export default App
