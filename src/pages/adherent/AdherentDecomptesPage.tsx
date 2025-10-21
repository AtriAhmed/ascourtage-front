import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonModal, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { searchCircle } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';
import AdherentSidebar from '../../components/layouts/adherent/AdherentSidebar';

const AdherentDecomptesPage: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const { user, userLoading }: { user: any, userLoading: boolean } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const [decomptes, setDecomptes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDecomptes = (query: string) => {
        setLoading(true);
        axios.get(`/api/adherents/${user.code_matricule_id}/decomptes`, {
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
        if (!userLoading && user)
            debouncedFetchDecomptes(searchQuery);
    }, [searchQuery, userLoading]);

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
                    <AdherentSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
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
                                            <div className="grid grid-cols-12 font-bold text-black">
                                                <div className="col-span-4 py-2">Prestataire</div>
                                                <div className="col-span-3 py-2">Montant</div>
                                                <div className="col-span-5 py-2 justify-self-center">Actions</div>
                                            </div>
                                            <div className='divide-y'>
                                                {decomptes?.map((decompte: any) =>
                                                    <Link to={`/decomptes/${decompte.numerodecompte}`} key={decompte.numerodecompte} className='grid grid-cols-12 text-black'>
                                                        <div className="col-span-4 py-2">
                                                            <IonText className="block">
                                                                {decompte.prestataire.identifiant}
                                                            </IonText>
                                                            <div className="flex gap-1 text-sm">
                                                                <IonText className="font-bold">
                                                                    {decompte.prestataire.prenom}{' '}
                                                                    {decompte.prestataire.nom}
                                                                </IonText>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-3 text-xs py-2 place-self-center justify-self-center">
                                                            <IonText>{decompte.totaldecompte} DT</IonText>
                                                        </div>
                                                        <div className="py-2 col-span-2 justify-self-end flex items-center">
                            <IonButton
                              fill="clear"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setToView(decompte);
                                setShowModal(true);
                              }}
                            >
                              <IonIcon
                                icon={searchCircle}
                                className="text-3xl text-primary"
                              />
                            </IonButton>
                          </div>

                          {/* Full Details Button */}
                          <div className="py-2 col-span-3 justify-self-end text-sm flex items-center">
                            <IonButton
                              className="blue text-btn"
                              expand="block"
                              size="small"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                history.push(
                                  `/decomptes/${decompte.numerodecompte}`
                                );
                              }}
                            >
                              Détails
                            </IonButton>
                          </div>
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
                                        <IonText className=''>{toView?.prestataire.matricule}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>prestataire:</IonText>
                                        <IonText className=''>{toView?.prestataire.identifiant}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Nom et Prenom:</IonText>
                                        <IonText className=''>{toView?.prestataire.prenom} {toView?.prestataire.nom}</IonText>
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

export default AdherentDecomptesPage;