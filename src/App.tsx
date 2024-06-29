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

import CustomSidebar from './components/CustomSidebar';
import './components/CustomSidebar.css'
import { useRef, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const isAuthed = true;

  const [isExpanded, setIsExpanded] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    setCurrentX(touchX);
    const width = touchX > 300 ? 300 : touchX < 60 ? 60 : touchX;
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${width}px`;
    }
  };

  const handleTouchEnd = () => {
    setIsExpanded(currentX > 150);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = currentX > 150 ? '300px' : '60px';
    }
    setStartX(0);
    setCurrentX(0);
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <IonApp>
      <div
        ref={sidebarRef}
        className={`shadow-xl sidebar-custom ${isExpanded ? 'expanded' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CustomSidebar isExpanded={isExpanded} />
      </div>
      <IonReactRouter>
        <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/adherents" component={Adherents} />
          <Route path="/declaration" component={Declaration} />
          <Route path="/ticket" component={Ticket} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
