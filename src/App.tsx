import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import './components/CustomSidebar.css';
import axios from 'axios';
import AuthProvider, { useAuthContext } from './context/AuthProvider';
import Dashboard from './pages/user/Dashboard';
import AdherentPrestataires from './pages/user/AdherentPrestataires';
import Prestataires from './pages/user/Prestataires';
import Bordereaux from './pages/user/Bordereaux';
import BordereauDecomptes from './pages/user/BordereauDecomptes';
import CirclesLoading from './components/Loadings/CirclesLoading';
import DecomptesPage from './pages/user/DecomptesPage';
import CumulPrestataires from './pages/user/CumulPrestataires';

setupIonicReact();

axios.defaults.baseURL = "http://localhost:8000/";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const App: React.FC = () => {
  const { user, userLoading } = useAuthContext();

  useEffect(()=>{
console.log(user)
  },[user])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Route path="/home" component={Home} />
          <Route path="/login" render={() => (userLoading ? <CirclesLoading /> : user ? <Redirect to="/dashboard" /> :<Login /> )} exact />
          <Route path="/profile" render={() => (userLoading ? <CirclesLoading /> : user ? <Profile /> : <Redirect to="/login" />)} exact />
          <Route path="/adherents" render={() => (userLoading ? <CirclesLoading /> : user ? <Adherents /> : <Redirect to="/login" />)} exact />
          <Route path="/prestataires/by-adherent/:id" render={() => (userLoading ? <CirclesLoading /> : user ? <AdherentPrestataires /> : <Redirect to="/login" />)} exact />
          <Route path="/prestataires" render={() => (userLoading ? <CirclesLoading /> : user ? <Prestataires /> : <Redirect to="/login" />)} exact />
          <Route path="/bordereaux" render={() => (userLoading ? <CirclesLoading /> : user ? <Bordereaux /> : <Redirect to="/login" />)} exact />
          <Route path="/decomptes/by-bordereau/:id" render={() => (userLoading ? <CirclesLoading /> : user ? <BordereauDecomptes /> : <Redirect to="/login" />)} exact />
          <Route path="/decomptes" render={() => (userLoading ? <CirclesLoading /> : user ? <DecomptesPage /> : <Redirect to="/login" />)} exact />
          <Route path="/cumul-prestataires" render={() => (userLoading ? <CirclesLoading /> : user ? <CumulPrestataires /> : <Redirect to="/login" />)} exact />
          <Route path="/declaration" render={() => (userLoading ? <CirclesLoading /> : user ? <Declaration /> : <Redirect to="/login" />)} exact />
          <Route path="/ticket" render={() => (userLoading ? <CirclesLoading /> : user ? <Ticket /> : <Redirect to="/login" />)} exact />
          <Route path="/dashboard" render={() => (userLoading ? <CirclesLoading /> : user ? <Dashboard /> : <Redirect to="/login" />)} exact />
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
