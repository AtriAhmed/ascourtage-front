import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const Bordereaux: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [isExpanded, setIsExpanded] = useState(false);

    const [bordereaux, setBordereaux] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchBordereaux = (query: string) => {
        setLoading(true);
        axios.get('/api/user-bordereaux', {
            params: { query }
        }).then(res => {
            setBordereaux(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchBordereaux = useCallback(debounce(fetchBordereaux, 500), []);

    useEffect(() => {
        debouncedFetchBordereaux(searchQuery);
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
                <Header title='Bordereaux' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Liste des Bordereaux</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className=''>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> :
                                    <>
                                        <div className='grid grid-cols-12 font-bold text-black'>
                                            <div className='col-span-6 py-2'>Bordereau</div>
                                            <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                                        </div>
                                        <div className='divide-y'>
                                            {bordereaux?.map((bordereau: any) =>
                                                <div key={bordereau.bordereau} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/decomptes/by-bordereau/${bordereau.bordereau}`) }} className='grid grid-cols-12 text-black'>
                                                    <div className='col-span-6 py-2'>
                                                        <IonText className='block'>{bordereau.bordereau}</IonText>
                                                        <div className='flex gap-1'><IonText className='font-bold'>{bordereau.MontantTotal} DT</IonText>
                                                            {/* <IonText>{bordereau.MontantTotal}</IonText> */}
                                                        </div>
                                                    </div>
                                                    <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(bordereau); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
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
                                    <IonTitle>Détailles Bordereau</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton color="light" onClick={() => setShowModal(false)}>
                                            Fermer
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className='ion-padding'>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Bordereau:</IonText>
                                        <IonText className=''>{toView?.bordereau}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Decomptes:</IonText>
                                        <IonText className=''>{toView?.Decomptes}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Premier N:</IonText>
                                        <IonText className=''>{toView?.PremierN}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Dernier N:</IonText>
                                        <IonText className=''>{toView?.DernierN}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Montant total:</IonText>
                                        <IonText className=''>{toView?.MontantTotal} DT</IonText>
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

export default Bordereaux;