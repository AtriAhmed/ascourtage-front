import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import './Adherents.css'
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/CustomSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CirclesLoading from '../../components/Loadings/CirclesLoading';

const CumulPrestataires: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [isExpanded, setIsExpanded] = useState(false);

    const [decomptes, setDecomptes] = useState([]);

    useEffect(() => {
            axios.get(`/api/decomptes/cumul-prestataires`).then(res => {
                setDecomptes(res.data);
                setLoading(false);
            })
    }, [])

    const [toView, setToView] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    if (loading) return <CirclesLoading />;

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
                    <IonTitle>Consommation prestataires</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='pl-[60px]'>
                    <IonSearchbar autocapitalize=''></IonSearchbar>
                    <IonCard>
                        <IonCardHeader className='bg-gray-100'>
                            <IonCardTitle>Consommation prestataire</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className=''>
                            <div className='grid grid-cols-12 font-bold text-black'>
                                <div className='col-span-6 py-2'>Decompte</div>
                                <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                            </div>
                            <div className='divide-y'>
                                {decomptes?.map((decompte: any) =>
                                    <div key={decompte.Prestataire} className='grid grid-cols-12 text-black'>
                                        <div className='col-span-6 py-2'>
                                            <IonText className='block'>{decompte.Prestataire}</IonText>
                                            <div className='flex gap-1'><IonText className='font-bold'>{decompte.Nometprenom}</IonText>
                                                <IonText>{decompte.TotalMontant}</IonText></div>
                                        </div>
                                        <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton fill='clear' id="open-modal" onClick={() => { setToView(decompte); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                    </div>
                                )}
                            </div>
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
                                    <IonText className='font-bold'>Decompte:</IonText>
                                    <IonText className=''>{toView?.id}</IonText>
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

export default CumulPrestataires;