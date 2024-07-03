import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Adherents from './pages/Adherents';
import Declaration from './pages/Declaration';
import Ticket from './pages/Ticket';

import './components/CustomSidebar.css'
import axios from 'axios';
import AuthProvider from './context/AuthProvider';
import Dashboard from './pages/user/Dashboard';

setupIonicReact();

const App: React.FC = () => {

  const isAuthed = true;

  axios.defaults.baseURL = "http://localhost:8000/";
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config
  })

  return (
    <AuthProvider>

      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/adherents" component={Adherents} />
            <Route path="/declaration" component={Declaration} />
            <Route path="/ticket" component={Ticket} />
            <Route path="/dashboard" component={Dashboard} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  );
}
export default App;
