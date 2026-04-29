import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EquipmentProvider } from './context/EquipmentContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EquipmentListPage from './pages/EquipmentListPage';
import EquipmentDetailsPage from './pages/EquipmentDetailsPage';
import RequestFormPage from './pages/RequestFormPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddEquipmentPage from './pages/AddEquipmentPage';
import GrievancesPage from './pages/GrievancesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EquipmentProvider>
          <div className="app-layout">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/equipment" element={<EquipmentListPage />} />
                <Route path="/equipment/:id" element={<EquipmentDetailsPage />} />
                <Route path="/request/:equipmentId" element={
                  <ProtectedRoute><RequestFormPage /></ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute><UserDashboard /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/add-equipment" element={
                  <ProtectedRoute allowedRoles={['Admin', 'Institution']}><AddEquipmentPage /></ProtectedRoute>
                } />
                <Route path="/grievances" element={<GrievancesPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/faq" element={<FAQPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </EquipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
