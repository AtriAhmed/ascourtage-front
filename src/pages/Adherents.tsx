import { IonAccordion, IonAccordionGroup, IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { menuController } from '@ionic/core/components';
import { add, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useRef } from 'react';
import './Adherents.css'

const Adherents: React.FC = () => {
  const history = useHistory();

  async function closeMenu(){
    await menuController.close("main-menu")
  }

  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
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
            <IonTitle>Adhérents</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">
                <IonSearchbar autocapitalize=''></IonSearchbar>
          <IonCard>
            <IonCardHeader className='bg-gray-100'>
                <IonCardTitle>Liste des Adhérents</IonCardTitle>
                </IonCardHeader>
            <IonCardContent className=''>
             <div className='grid grid-cols-12 font-bold text-black'>
                    <div className='col-span-6 py-2'>Adhérent</div>
                    <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
             </div>
             <div className='divide-y'>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1001</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Masmoudi</IonText>
                      <IonText>Doniazed</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton fill='clear' id="open-modal"><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1002</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Bougobba</IonText>
                      <IonText>Sami</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1003</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Hamdi</IonText>
                      <IonText>Mohamed</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1003</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Hamdi</IonText>
                      <IonText>Mohamed</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1003</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Hamdi</IonText>
                      <IonText>Mohamed</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
             </div>
             <div className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>1003</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>Hamdi</IonText>
                      <IonText>Mohamed</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
             </div>
             </div>
            </IonCardContent>
          </IonCard>
        <IonModal id="example-modal" ref={modal} trigger="open-modal">
          <IonContent>
            <IonToolbar className='tool'>
              <IonTitle>Détailles Adhérent</IonTitle>
              <IonButtons slot="end">
                <IonButton color="light" onClick={() => dismiss()}>
                  Fermer
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <div className='ion-padding'>
            <div className='flex gap-2'>
              <IonText className='font-bold'>Adherent:</IonText>
              <IonText className=''>1001</IonText>
            </div>
            <div className='flex gap-2'>
              <IonText className='font-bold'>Date Entrée:</IonText>
              <IonText className=''>2022-04-01</IonText>
            </div>
            <div className='flex gap-2'>
              <IonText className='font-bold'>Nom:</IonText>
              <IonText className=''>Masmoudi</IonText>
            </div>
            <div className='flex gap-2'>
              <IonText className='font-bold'>Prénom:</IonText>
              <IonText className=''>Doniazed</IonText>
            </div>
            <div className='flex gap-2'>
              <IonText className='font-bold'>Date de naissance:</IonText>
              <IonText className=''>1984-03-23</IonText>
            </div>
            <div className='flex gap-2'>
              <IonText className='font-bold'>RIB:</IonText>
              <IonText className=''>12700000013309256049</IonText>
            </div>
            </div>
          </IonContent>
        </IonModal>
        </IonContent>
      </IonPage>
    </>
    )
};

export default Adherents;
