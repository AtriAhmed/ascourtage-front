import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { menuController } from '@ionic/core/components';
import { add, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';

const Adherents: React.FC = () => {
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
            <IonTitle>Adherents</IonTitle>
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
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonIcon icon={searchCircle} className='text-3xl text-primary' /> </div>
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
        </IonContent>
      </IonPage>
    </>
    )
};

export default Adherents;
