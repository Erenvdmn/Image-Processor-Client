import React from 'react';
import Sidebars from './components/Sidebar';
import Home from './views/Home';
import Edit from './views/Edit';
import Library from './views/Library';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Sidebars />
      <main style={{ marginLeft: 350 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
