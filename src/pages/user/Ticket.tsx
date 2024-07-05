import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { menuController } from '@ionic/core/components';
import { add, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import "./Ticket.css"
const Ticket: React.FC = () => {
  const history = useHistory();

  async function closeMenu(){
    await menuController.close("main-menu")
  }

  return (
  <>
      <IonMenu menuId='main-menu' contentId="main-content">
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
      <IonItem color="light" onClick={()=>{history.push("/declaration");closeMenu()}}>
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
            <IonTitle>Assistance</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        
    <IonItem>
        <IonInput label="Veuillez choisir un object" labelPlacement="floating"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput label="Personne de contact" labelPlacement="floating"></IonInput>
      </IonItem>
      <IonItem>
      <IonTextarea label='Contenu de votre demande' labelPlacement="floating" />
      </IonItem>
      <IonButton className='m-5' expand='block' shape="round" onClick={()=>history.push("/profile")}>Créer Ticket</IonButton>

        </IonContent>
      </IonPage>
    </>
    )
};

export default Ticket;
