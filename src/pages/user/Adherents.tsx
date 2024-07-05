import { IonAccordion, IonAccordionGroup, IonAvatar, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { menuController } from '@ionic/core/components';
import { add, menu, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import './Adherents.css'
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/CustomSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Adherents: React.FC = () => {
  const history = useHistory();

  const { user }: { user: any } = useAuthContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const [adherents, setAdherents] = useState([]);

  useEffect(() => {
    axios.get('/api/adherents').then(res => {
      setAdherents(res.data);
    })
  }, [])

  const [toView, setToView] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  // if (!user) return "Loading"

  return (
    <IonPage id="main-content">
      <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start' className='ml-2'>
            <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
              <IonIcon icon={menu} className='' />
            </IonButton>
          </IonButtons>
          <IonTitle>Adhérents</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='pl-[60px]'>
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
                {adherents.map((adherent: any) =>
                  <div key={adherent.Adherent} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/prestataires/by-adherents/${adherent.Adherent}`) }} className='grid grid-cols-12 text-black'>
                    <div className='col-span-6 py-2'>
                      <IonText className='block'>{adherent.Adherent}</IonText>
                      <div className='flex gap-1'><IonText className='font-bold'>{adherent.Nom}</IonText>
                        <IonText>{adherent.Prenom}</IonText></div>
                    </div>
                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(adherent); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                  </div>
                )}
              </div>
            </IonCardContent>
          </IonCard>
          <IonModal id='example-modal' isOpen={showModal}>
            <IonContent>
              <IonToolbar className='tool'>
                <IonTitle>Détailles Adhérent</IonTitle>
                <IonButtons slot="end">
                  <IonButton color="light" onClick={() => setShowModal(false)}>
                    Fermer
                  </IonButton>
                </IonButtons>
              </IonToolbar>
              <div className='ion-padding'>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>Adherent:</IonText>
                  <IonText className=''>{toView?.Adherent}</IonText>
                </div>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>Date Entrée:</IonText>
                  <IonText className=''>{toView?.Dateentree}</IonText>
                </div>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>Nom:</IonText>
                  <IonText className=''>{toView?.Nom}</IonText>
                </div>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>Prénom:</IonText>
                  <IonText className=''>{toView?.Prenom}</IonText>
                </div>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>Date de naissance:</IonText>
                  <IonText className=''>{toView?.Datenaissance}</IonText>
                </div>
                <div className='flex gap-2'>
                  <IonText className='font-bold'>RIB:</IonText>
                  <IonText className=''>{toView?.RIB}</IonText>
                </div>
              </div>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Adherents;