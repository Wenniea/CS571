
import './App.css';
import AboutUs from './components/Home';
import AllSongs from './components/AllSongs';
import BadgerBeats from './components/BadgerBeats';
import FavoriteSongs from './components/FavoriteSongs';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from './components/NoMatch';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<BadgerBeats />}>
        <Route index element={<AboutUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="songs" element={<AllSongs />} />
        <Route path="favorites" element={<FavoriteSongs />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App;
