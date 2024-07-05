import { IonBadge, IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { add } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useAuthContext } from '../context/AuthProvider';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#082374] via-blue-900 to-blue-700'>
          <div className='flex flex-col gap-[100px]'>
            <div className='flex flex-col gap-4 items-center'>
              <div className='text-white font-bold text-4xl'>Bienvenue à</div>
              <IonImg
                src="/ascourtage.png"
                alt="ASCOURTAGE"
              ></IonImg>
            </div>


            <IonButton expand='block' shape="round" onClick={() => history.push("/login")} className='blue'>S'identifier</IonButton>
          </div>

        </div>

        {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
