import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import Loading from '../../components/Loading';
import './Declarations.css'
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { debounce } from 'lodash';

const Declarations: React.FC = () => {
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const [declarations, setDeclarations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDeclarations = (query: string) => {
        setLoading(true);
        axios.get('/api/all-declarations', {
            params: { query }
        }).then(res => {
            setDeclarations(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchDeclarations = useCallback(debounce(fetchDeclarations, 500), []);

    useEffect(() => {
        debouncedFetchDeclarations(searchQuery);
    }, [searchQuery]);

    const handleSearchChange = (e: CustomEvent) => {
        setSearchQuery(e.detail.value);
    };

    const [toView, setToView] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Declarations</IonTitle>
                    <IonButtons slot='end' className='ml-2'>
                        <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
                            <IonIcon icon={menu} className='' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <div className='pl-[60px]'>
                    <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                    <IonCard>
                        <IonCardHeader className='bg-gray-100'>
                            <IonCardTitle>Liste des Declarations</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className=''>
                            {
                                loading ? <Loading type='' /> : <>
                                    <div className='grid grid-cols-12 font-bold text-black'>
                                        <div className='col-span-6 py-2'>Date</div>
                                        <div className='col-span-6 py-2 justify-self-center place-self-center'>Fichier</div>
                                    </div>
                                    <div className='divide-y'>
                                        {declarations.map((declaration: any) => (
                                            <div key={declaration.id} className='grid grid-cols-12 text-black'>
                                                <div className='col-span-4 py-2 flex flex-col '>
                                                    <IonText >{declaration.date}</IonText>
                                                </div>
                                                <div className='py-2 col-span-8 justify-self-center place-self-center break-all'>{declaration.file}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }
                        </IonCardContent>
                    </IonCard>
                    <IonModal id='example-modal' isOpen={showModal}>
                        <IonContent>
                            <IonToolbar className='tool'>
                                <IonTitle>Détailles Declaration</IonTitle>
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

export default Declarations;