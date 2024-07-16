import React, { ReactNode, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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

setupIonicReact();

axios.defaults.baseURL = "http://localhost:8000/";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const IS_ADMIN = true;

const App: React.FC = () => {
  const { user, userLoading } = useAuthContext();

  useEffect(() => {
    console.log(user, userLoading)
  }, [user, userLoading])

  function auth(cmp: ReactNode, isAdmin?: boolean) {
    return userLoading ? <Loading type='page' /> : user && (user.account_owner || !isAdmin) ? cmp : <Redirect to="/login" />
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Route path="/home" component={Home} />
          <Route path="/login" render={() => !user && !userLoading ? <Login /> : userLoading ? <Loading type='page' /> : user && user.account_owner ? <Redirect to="/admin/dashboard" /> : <Redirect to="/dashboard" />} exact />
          <Route path="/profile" render={() => auth(<Profile />)} exact />
          <Route path="/profile/edit" render={() => auth(<ProfileEdit />)} exact />
          <Route path="/adherents" render={() => auth(<Adherents />)} exact />
          <Route path="/prestataires/by-adherent/:id" render={() => auth(<AdherentPrestataires />)} exact />
          <Route path="/prestataires" render={() => auth(<Prestataires />)} exact />
          <Route path="/bordereaux" render={() => auth(<Bordereaux />)} exact />
          <Route path="/decomptes/by-bordereau/:id" render={() => auth(<BordereauDecomptes />)} exact />
          <Route path="/decomptes" render={() => auth(<DecomptesPage />)} exact />
          <Route path="/decomptes/:id" render={() => auth(<DecompteDetails />)} exact />
          <Route path="/cumul-prestataires" render={() => auth(<CumulPrestataires />)} exact />
          <Route path="/cumul-prestataires/:id" render={() => auth(<CumulPrestatairesDetail />)} exact />
          <Route path="/declaration" render={() => auth(<Declaration />)} exact />
          <Route path="/assistance" render={() => auth(<Ticket />)} exact />
          <Route path="/dashboard" render={() => auth(<Dashboard />)} exact />

          <Route path="/admin/dashboard" render={() => auth(<AdminDashboard />, IS_ADMIN)} exact />
          <Route path="/admin/tickets" render={() => auth(<AdminTickets />, IS_ADMIN)} exact />
          <Route path="/admin/tickets/:id" render={() => auth(<TicketAdmin />, IS_ADMIN)} exact />
          <Route path="/admin/users" render={() => auth(<Users />, IS_ADMIN)} exact />
          <Route path="/admin/users/:id" render={() => auth(<UserEdit />, IS_ADMIN)} exact />
          <Route path="/admin/bordereaux" render={() => auth(<BordereauxAdmin />, IS_ADMIN)} exact />
          <Route path="/admin/adherents" render={() => auth(<AdherentsAdmin />, IS_ADMIN)} exact />
          <Route path="/admin/declarations" render={() => auth(<Declarations />, IS_ADMIN)} exact />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
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
