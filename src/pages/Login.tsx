import { IonBadge, IonButton, IonButtons, IonCard, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { add } from "ionicons/icons";
import { useHistory } from 'react-router';

import { Keyboard } from '@capacitor/keyboard';
import { useEffect, useState } from 'react';

const Login: React.FC = () => {
    const history = useHistory();

    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow', () => {
            console.log("hello")
          setKeyboardIsOpen(true);
        });
        
        Keyboard.addListener('keyboardDidHide', () => {
            console.log("hello")
          setKeyboardIsOpen(false);
        });
    })
    
  return (
    <IonPage>
      
      <IonContent fullscreen>
        <div className='h-full flex flex-col justify-between items-center'>
    <div className={`h-full flex items-center ${keyboardIsOpen ? 'hidden' : ''}`} >
    <IonImg
      src="https://sante.ascourtage.tn/users/images/logo.png"
      alt="ASCOURTAGE"
      className='w-[200px]'
    ></IonImg>
    </div>
    <div className='flex flex-col gap-5 w-full p-10 pt-16 h-full rounded-t-[100px]' style={keyboardIsOpen ?{ } :{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 50px 0px"}}>
        <div className='text-xl font-bold text-primary'>Se connecter</div>
    <IonItem>
        <IonInput label="Nom d'utilisateur" labelPlacement="floating"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput label="Mot de passe" labelPlacement="floating"></IonInput>
      </IonItem>
      <IonButton expand='block' shape="round" onClick={()=>history.push("/profile")}>S'identifier</IonButton>

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

export default Login;
