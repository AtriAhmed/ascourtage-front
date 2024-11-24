import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import './Adherents.css'
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const Adherents: React.FC = () => {

  const history = useHistory();

  const router = useIonRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [adherents, setAdherents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAdherents = (query: string) => {
    setLoading(true);
    axios.get('/api/user-adherents', {
      params: { query }
    }).then(res => {
      setAdherents(res.data);
    }).catch((err: any) => {
      if (err.response.status == 401) window.location.pathname = "/login"
    }).
      finally(() => {
        setLoading(false);
      });
  };

  const debouncedFetchAdherents = useCallback(debounce(fetchAdherents, 500), []);

  useEffect(() => {
    debouncedFetchAdherents(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: CustomEvent) => {
    setSearchQuery(e.detail.value);
  };

  const [toView, setToView] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className='h-full'
      >
        <Header title='Adherents' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <IonContent>
          <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className='pl-[60px] pb-[48px]'>
            <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
            <IonCard>
              <IonCardHeader className='bg-gray-100'>
                <IonCardTitle>Liste des Adhérents</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className=''>
                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> :
                  <>
                    <div className='grid grid-cols-12 font-bold text-black'>
                      <div className='col-span-6 py-2'>Adhérent</div>
                      <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                    </div>
                    <div className='divide-y'>
                      {adherents.map((adherent: any) =>
                        <div key={adherent.Adherent} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/prestataires/by-adherent/${adherent.Adherent}`) }} className='grid grid-cols-12 text-black'>
                          <div className='col-span-6 py-2'>
                            <IonText className='block'>{adherent.Adherent}</IonText>
                            <div className='flex gap-1'><IonText className='font-bold'>{adherent.Nom}</IonText>
                              <IonText>{adherent.Prenom}</IonText></div>
                          </div>
                          <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(adherent); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                        </div>
                      )}
                    </div>
                  </>
                }
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
                  <div className='flex gap-2'>
                    <IonText className='font-bold'>Etat:</IonText>
                    <IonText className=''>{toView?.Etat}</IonText>
                  </div>
                </div>
              </IonContent>
            </IonModal>
          </div>
        </IonContent>
      </motion.div>
    </IonPage>
  );
};

export default Adherents;