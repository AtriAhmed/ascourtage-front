import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import "./CumulPrestataires.css";
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const CumulPrestataires: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [isExpanded, setIsExpanded] = useState(false);

    const [decomptes, setDecomptes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDecomptes = (query: string) => {
        setLoading(true);
        axios.get(`/api/decomptes/cumul-prestataires`, {
            params: { query }
        }).then(res => {
            setDecomptes(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchDecomptes = useCallback(debounce(fetchDecomptes, 500), []);

    useEffect(() => {
        debouncedFetchDecomptes(searchQuery);
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
                <Header title='Cumul Prestataires' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Consommation prestataire</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className='p-1'>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> :
                                    <>
                                        <div className='grid grid-cols-12 font-bold text-black'>
                                            <div className='col-span-6 py-2'>Prestataire</div>
                                            <div className='col-span-6 py-2'>Montant (DT)</div>
                                        </div>
                                        <div className='divide-y'>
                                            {decomptes?.map((decompte: any) =>
                                                <div onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/cumul-prestataires/${decompte.Prestataire}`) }} key={decompte.Prestataire} className='grid grid-cols-12 text-black'>
                                                    <div className='col-span-6 py-2'>
                                                        <IonText className='block'>{decompte.Prestataire}</IonText>
                                                        <div className='flex gap-1'><IonText className='font-bold'>{decompte.Nometprenom}</IonText>
                                                        </div>
                                                    </div>
                                                    <div className='col-span-5 place-self-center justify-self-start'><IonText>{decompte.TotalMontant}</IonText></div>
                                                    <div className='py-2 col-span-1 justify-self-end place-self-center'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(decompte); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
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
                                    <IonTitle>Détailles Decompte</IonTitle>
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
                                        <IonText className='font-bold'>Prestataire:</IonText>
                                        <IonText className=''>{toView?.Prestataire}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Nom et Prenom:</IonText>
                                        <IonText className=''>{toView?.Nometprenom}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Montant:</IonText>
                                        <IonText className=''>{toView?.TotalMontant} DT</IonText>
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

export default CumulPrestataires;