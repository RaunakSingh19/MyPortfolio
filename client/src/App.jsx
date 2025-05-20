import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ClientPage from './pages/ClientPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      
      <div className="App">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<ClientPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;