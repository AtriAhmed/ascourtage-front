import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRedirect, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const Prestataires: React.FC = () => {
    const history = useHistory()
    const router = useIonRouter();

    const [loading, setLoading] = useState(true);

    const [isExpanded, setIsExpanded] = useState(false);

    const [prestataires, setPrestataires] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPrestataires = (query: string) => {
        setLoading(true);
        axios.get('/api/user-prestataires', {
            params: { query }
        }).then(res => {
            setPrestataires(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchPrestataires = useCallback(debounce(fetchPrestataires, 500), []);

    useEffect(() => {
        debouncedFetchPrestataires(searchQuery);
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
                <Header title='Prestataires' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent >
                    <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard className=''>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Liste des Prestataires</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className=''>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> : <>

                                    <div className='grid grid-cols-12 font-bold text-black'>
                                        <div className='col-span-6 py-2'>Prestataire</div>
                                        <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                                    </div>
                                    <div className='divide-y'>
                                        {prestataires?.map((prestataire: any) =>
                                            <div key={prestataire.id} className='grid grid-cols-12 text-black'>
                                                <div className='col-span-6 py-2'>
                                                    <IonText className='block'>{prestataire.Prestataire}</IonText>
                                                    <div className='flex gap-1'><IonText className='font-bold'>{prestataire.Nom}</IonText>
                                                        <IonText>{prestataire.Prenom}</IonText></div>
                                                </div>
                                                <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton fill='clear' id="open-modal" onClick={() => { setToView(prestataire); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                            </div>
                                        )}
                                    </div>
                                </>}
                            </IonCardContent>
                        </IonCard>
                        <IonModal id='example-modal' isOpen={showModal}>
                            <IonContent>
                                <IonToolbar className='tool'>
                                    <IonTitle>Détailles Prestataire</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton color="light" onClick={() => setShowModal(false)}>
                                            Fermer
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className='ion-padding'>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Prestataire:</IonText>
                                        <IonText className=''>{toView?.Prestataire}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Nom:</IonText>
                                        <IonText className=''>{toView?.Nom}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Prenom:</IonText>
                                        <IonText className=''>{toView?.Prenom}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Nom JF:</IonText>
                                        <IonText className=''>{toView?.NomJF}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Date de naissance:</IonText>
                                        <IonText className=''>{toView?.DateNaissance}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Rang:</IonText>
                                        <IonText className=''>{toView?.Rang}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Date Entrée:</IonText>
                                        <IonText className=''>{toView?.DateEntree}</IonText>
                                    </div>
                                </div>
                            </IonContent>
                        </IonModal>
                    </div>
                </IonContent>
            </motion.div>
        </IonPage>
    )
};

export default Prestataires;