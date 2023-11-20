import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PokemonPage from './components/PokemonPage';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PokemonPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;