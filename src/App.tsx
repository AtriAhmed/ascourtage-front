import React, { ReactNode, useEffect } from 'react';
import { Redirect, Route, Router, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Adherents from './pages/user/Adherents';
import Declaration from './pages/user/Declaration';
import Ticket from './pages/user/Ticket';
import axios from 'axios';
import AuthProvider, { useAuthContext } from './context/AuthProvider';
import Dashboard from './pages/user/Dashboard';
import AdherentPrestataires from './pages/user/AdherentPrestataires';
import Prestataires from './pages/user/Prestataires';
import Bordereaux from './pages/user/Bordereaux';
import BordereauDecomptes from './pages/user/BordereauDecomptes';
import Loading from './components/Loading';
import DecomptesPage from './pages/user/DecomptesPage';
import CumulPrestataires from './pages/user/CumulPrestataires';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTickets from './pages/admin/AdminTickets';
import Users from './pages/admin/Users';
import Declarations from './pages/admin/Declarations';
import AdherentsAdmin from './pages/admin/AdherentsAdmin';
import BordereauxAdmin from './pages/admin/BordereauxAdmin';
import DecompteDetails from './pages/user/DecompteDetails';
import CumulPrestatairesDetail from './pages/user/CumulPrestataireDetail';
import ProfileEdit from './pages/ProfileEdit';
import TicketAdmin from './pages/admin/TicketAdmin';
import UserEdit from './pages/admin/UserEdit';
import AnimatedRoutes from './components/AnimatedRoutes';

setupIonicReact();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <AnimatedRoutes />
      </IonReactRouter>
    </IonApp>
  );
};


export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
