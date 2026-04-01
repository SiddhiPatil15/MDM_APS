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
  
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth" replace />;
  };

  return (
    <Router basename="/MDM_APS">
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={currentUser ? <Navigate to="/" replace /> : <Auth />} />
          <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
          <Route path="/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path="/item/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
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
