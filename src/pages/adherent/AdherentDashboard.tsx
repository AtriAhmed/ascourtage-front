import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonText,
  IonIcon,
} from '@ionic/react';
import { documentText, people, person } from 'ionicons/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import Header from '../../components/layouts/Header';
import AdherentSidebar from '../../components/layouts/adherent/AdherentSidebar';

const ROUTES = [
  {
    path: '/adherents/prestataires',
    label: 'Prestataires',
    icon: people
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: person
  },
  {
    path: '/adherent/decomptes',
    label: 'Decomptes',
    icon: documentText
  }
];

const AdherentDashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  const [stats, setStats] = useState<{ prestatairesNb: number; decomptesNb: number } | null>(null);

  useEffect(() => {
    axios.get("/api/stats/adherent").then(res => {
      console.log(res.data);
      setStats({
        prestatairesNb: res.data.prestatairesNb,
        decomptesNb: res.data.decomptesNb
      });
    });
  }, []);

  if (!stats) {
    return (
      <IonPage>
        <Header title="Dashboard" isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <IonContent>
          <AdherentSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className="flex justify-center items-center h-full">
            <IonText>Loading...</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header title="Dashboard" isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <IonContent>
        <AdherentSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div className="pl-[60px] pb-[48px]">
          <div className="grid grid-cols-12">
            {ROUTES.map((route, index) => {
              let value;
              if (index === 0) value = stats.prestatairesNb;
              else if (index === 1) value = "-"; // Profile has no stat number
              else if (index === 2) value = stats.decomptesNb;

              return (
                <div key={index} className="col-span-6">
                  <IonCard onClick={() => history.push(route.path)}>
                    <IonCardContent className="flex flex-col items-center justify-center border-l-8 border-primary">
                      <div><IonIcon icon={route.icon} className="text-xl" /></div>
                      <div>{value}</div>
                      {route.label}
                    </IonCardContent>
                  </IonCard>
                </div>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdherentDashboard;
