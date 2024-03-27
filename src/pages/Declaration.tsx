import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menuController } from '@ionic/core/components';
import {  warning } from "ionicons/icons";
import { useHistory } from 'react-router';

const Declaration: React.FC = () => {
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
      <IonItem color="light">
          <IonLabel>Déclaration salaires</IonLabel>
        </IonItem>
        <IonItem color="light" onClick={()=>{history.push("/ticket");closeMenu();console.log("hello")}}>
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
            <IonTitle>Déclaration Salaires</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
            <div className='bg-yellow-200 rounded p-2 m-2'>
<IonText className='font-semibold flex items-center gap-2'>Merci de télécharger vos fichiers au format: xls ou xlsx <IonIcon icon={warning} className='text-4xl' /></IonText>
            </div>
            <div className='mx-2 px-2 pt-2 gap-2 flex flex-col'>
<input type="file" className='rounded-lg ' />
<IonButton >Télécharger</IonButton>
            </div>
          <IonCard>
            <IonCardHeader className='bg-gray-100'>
                <IonCardTitle>Déclaration des salaires</IonCardTitle>
                </IonCardHeader>
            <IonCardContent className=''>
             <div className='grid grid-cols-12 font-bold text-black'>
                    <div className='col-span-6 py-2'>Date</div>
                    <div className='col-span-6 py-2 justify-self-center place-self-center'>Fichier</div>
             </div>
             <div className='divide-y'>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-4 py-2 flex flex-col '>
                      <IonText >2024-03-27</IonText>
                      <IonText >20:55</IonText>
                    </div>
                    <div className='py-2 col-span-8 justify-self-center place-self-center break-all'>uploads/660479949076f.xls</div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-4 py-2 flex flex-col '>
                      <IonText >2024-03-27</IonText>
                      <IonText >20:55</IonText>
                    </div>
                    <div className='py-2 col-span-8 justify-self-center place-self-center break-all'>uploads/660479949076f.xls</div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-4 py-2 flex flex-col '>
                      <IonText >2024-03-27</IonText>
                      <IonText >20:55</IonText>
                    </div>
                    <div className='py-2 col-span-8 justify-self-center place-self-center break-all'>uploads/660479949076f.xls</div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-4 py-2 flex flex-col '>
                      <IonText >2024-03-27</IonText>
                      <IonText >20:55</IonText>
                    </div>
                    <div className='py-2 col-span-8 justify-self-center place-self-center break-all'>uploads/660479949076f.xls</div>
             </div>
             </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
    )
};

export default Declaration;
