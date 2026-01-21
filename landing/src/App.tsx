import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <main className='py-8 px-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
