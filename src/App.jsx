import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import { AppProvider, useAppContext } from './context/AppContext';

function AppRoutes() {
  const { currentUser } = useAppContext();
  
  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={currentUser ? <Navigate to="/" replace /> : <Auth />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
