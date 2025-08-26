import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebars from './components/Sidebar';
import Home from './views/Home';
import Edit from './views/Edit';
import Library from './views/Library';


function App() {
  const [ images, setImages ] = useState([]);
  return (
    <BrowserRouter>
      <Sidebars />
      <main style={{ marginLeft: 350 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="library/edit/:id" element={<Edit setImages={setImages} />} />
          <Route path="/library" element={<Library images={images} setImages={setImages} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
