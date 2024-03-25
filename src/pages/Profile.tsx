import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { add } from "ionicons/icons";
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
  const history = useHistory();

  return (
  <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent >
        <IonAccordionGroup>
      <IonAccordion value="first">
        <IonItem slot="header" color="light">
          <IonLabel>Adhérents</IonLabel>
        </IonItem>
        <div className="p-4 pl-8" slot="content">
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
        <IonContent className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
      </IonPage>
    </>
    )
};

export default Profile;
