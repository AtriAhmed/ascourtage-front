import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { add } from "ionicons/icons";
import { useHistory } from 'react-router';
import { menuController } from '@ionic/core/components';

const Profile: React.FC = () => {
  const history = useHistory();

 async function closeMenu(){
    await menuController.close("main-menu")
  }

  return (
  <>
      <IonMenu menuId="main-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>ASCOURTAGE</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent >
        <IonAccordionGroup>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>Adhérents</IonLabel>
        </IonItem>
        <div className="p-4 pl-8" slot="content" onClick={()=>{history.push("/adherents");closeMenu()}}>
          Liste de adhérents
        </div>
        <div className="p-4 pl-8" slot="content">
          Liste des prestataires
        </div>
      </IonAccordion>
      <IonAccordion value="second">
        <IonItem slot="header" color="light">
          <IonLabel>Remboursements</IonLabel>
        </IonItem>
        <div className="p-4 pl-8" slot="content">
          Bordereaux
        </div>
        <div className="p-4 pl-8" slot="content">
          Recherche decomptes
        </div>
        <div className="p-4 pl-8" slot="content">
          Consommation prestataires
        </div>
      </IonAccordion>
      <IonItem color="light">
          <IonLabel>Déclaration salaires</IonLabel>
        </IonItem>
        <IonItem color="light">
          <IonLabel>Assistance</IonLabel>
        </IonItem>
        <IonItem color="light">
          <IonLabel>Profile</IonLabel>
        </IonItem>
      <IonAccordion value="sixth">
        <IonItem slot="header" color="light">
          <IonLabel>Account</IonLabel>
        </IonItem>
        <div className="p-4 pl-8" slot="content">
          Compte
        </div>
        <div className="p-4 pl-8" slot="content">
          Se déconnecter
        </div>
      </IonAccordion>
    </IonAccordionGroup>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonImg className='' src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
              <IonText className="text-black text-xl font-bold flex justify-center">01 STE ALFA DE COMMERCE</IonText>
              <IonText className="text-lg flex justify-center">@ste01</IonText>
              <div className='flex justify-center'><IonButton className=''>Editer les infos du compte</IonButton></div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
    )
};

export default Profile;
