import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Repairs from './pages/Repairs';
import Inventory from './pages/Inventory';
import Brands from './pages/Brands';
import Reports from './pages/Reports';
import Archive from './pages/Archive';
import Settings from './pages/Settings';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="repairs" element={<Repairs />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="brands" element={<Brands />} />
              <Route path="reports" element={<Reports />} />
              <Route path="archive" element={<Archive />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;