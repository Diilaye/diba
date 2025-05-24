import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProgramsListing from './pages/ProgramsListing';
import ProgramDetail from './pages/ProgramDetail';
import JoinPage from './pages/JoinPage';
import ClientPortal from './pages/ClientPortal';
import AccountPage from './pages/AccountPage';
import VisionPage from './pages/VisionPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ModernSubscribePage from './pages/SubscribePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="programmes" element={<ProgramsListing />} />
        <Route path="programmes/:id" element={<ProgramDetail />} />
        <Route path="souscrire" element={<JoinPage />} />
        <Route path="adherer" element={<ModernSubscribePage />} />
        <Route path="connexion" element={<LoginPage />} />
        <Route path="mon-dossier" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>} />
        <Route path="mon-dossier/comptable" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="mon-dossier/paiement" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="vision-future" element={<VisionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;