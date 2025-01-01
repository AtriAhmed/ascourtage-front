import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import UserSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const DecomptesPage: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const { user }: { user: any } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const [decomptes, setDecomptes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDecomptes = (query: string) => {
        setLoading(true);
        axios.get('/api/decomptes', {
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
        <IonPage >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Decomptes' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <UserSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Liste des Decomptes</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className=''>
                                {
                                    loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> :
                                        <>
                                            <div className='grid grid-cols-12 font-bold text-black'>
                                                <div className='col-span-5 py-2'>prestataire</div>
                                                <div className='col-span-5 py-2'>Montant</div>
                                                <div className='col-span-2 py-2 justify-self-end'></div>
                                            </div>
                                            <div className='divide-y'>
                                                {decomptes?.map((decompte: any) =>
                                                    <Link to={`/decomptes/${decompte.numerodecompte}`} key={decompte.numerodecompte} className='grid grid-cols-12 text-black'>
                                                        <div className='col-span-5 py-2'>
                                                            <IonText className='block'>{decompte.prestataire}</IonText>
                                                            <div className='flex gap-1'><IonText className='font-bold'>{decompte.adherent.prenom} {decompte.adherent.nom}</IonText>
                                                            </div>
                                                        </div>
                                                        <div className='col-span-5 py-2 place-self-center justify-self-start'><IonText>{decompte.totaldecompte} DT</IonText></div>
                                                        <div className='py-2 col-span-2 justify-self-end'><IonButton fill='clear' id="open-modal" onClick={(e) => {
                    e.preventDefault(); // Prevent the link behavior
                    e.stopPropagation(); // Stop event propagation
                    setToView(decompte);
                    setShowModal(true);
                }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                                    </Link>
                                                )}
                                            </div>
                                        </>
                                }
                            </IonCardContent>
                        </IonCard>
                        <IonModal id='example-modal' isOpen={showModal}>
                            <IonContent>
                                <IonToolbar className='tool'>
                                    <IonTitle>Détailles numerodecompte</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton color="light" onClick={() => setShowModal(false)}>
                                            Fermer
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className='ion-padding'>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>numerodecompte:</IonText>
                                        <IonText className=''>{toView?.numerodecompte}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Adherent:</IonText>
                                        <IonText className=''>{toView?.adherent.matricule}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>prestataire:</IonText>
                                        <IonText className=''>{toView?.prestataire}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Nom et Prenom:</IonText>
                                        <IonText className=''>{toView?.adherent.prenom} {toView?.adherent.nom}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Date du soins:</IonText>
                                        <IonText className=''>{toView?.datesoins}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Montant:</IonText>
                                        <IonText className=''>{toView?.totaldecompte}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Remarques:</IonText>
                                        <IonText className=''>{toView?.observations}</IonText>
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

export default DecomptesPage;