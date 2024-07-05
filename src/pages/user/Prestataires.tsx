import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menu, searchCircle } from "ionicons/icons";
import { useHistory, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import './Adherents.css'
import { useAuthContext } from '../../context/AuthProvider';
import CustomSidebar from '../../components/CustomSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Prestataires: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const { user }: { user: any } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const [prestataires, setPrestataires] = useState([]);

    useEffect(() => {
        axios.get(`/api/prestataires`).then(res => {
            setPrestataires(res.data);
            setLoading(false);
        })
    }, [])

    const [toView, setToView] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //   console.log(user)
    // }, [user])

    // if (!user) return "Loading"

    if (loading) return "Loading";

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
                    <IonTitle>Prestataires</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='pl-[60px]'>
                    <IonSearchbar autocapitalize=''></IonSearchbar>
                    <IonCard>
                        <IonCardHeader className='bg-gray-100'>
                            <IonCardTitle>Liste des Prestataires</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className=''>
                            <div className='grid grid-cols-12 font-bold text-black'>
                                <div className='col-span-6 py-2'>Prestataire</div>
                                <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                            </div>
                            <div className='divide-y'>
                                {prestataires?.map((prestataire: any) =>
                                    <Link to={`/prestataires/${prestataire.id}`} className='grid grid-cols-12 text-black'>
                                        <div className='col-span-6 py-2'>
                                            <IonText className='block'>{prestataire.id}</IonText>
                                            <div className='flex gap-1'><IonText className='font-bold'>{prestataire.Nom}</IonText>
                                                <IonText>{prestataire.Prenom}</IonText></div>
                                        </div>
                                        <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton fill='clear' id="open-modal" onClick={() => { setToView(prestataire); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                    </Link>
                                )}
                            </div>
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

export default Prestataires;