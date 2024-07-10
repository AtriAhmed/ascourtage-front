import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { add, menu, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import CustomSidebar from '../../components/CustomSidebar';
import axios from 'axios';
import CirclesLoading from '../../components/Loadings/CirclesLoading';
import './Users.css'

const Users: React.FC = () => {
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/users').then(res => {
            setUsers(res.data);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const [toView, setToView] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    if (loading) return <CirclesLoading />

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
                    <IonTitle>Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='pl-[60px]'>
                    <IonSearchbar autocapitalize=''></IonSearchbar>
                    <IonCard>
                        <IonCardHeader className='bg-gray-100'>
                            <IonCardTitle>Liste des Users</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className=''>
                            <div className='grid grid-cols-12 font-bold text-black'>
                                <div className='col-span-6 py-2'>User</div>
                                <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                            </div>
                            <div className='divide-y'>
                                {users.map((user: any) =>
                                    <div key={user.id} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/prestataires/by-user/${user.Adherent}`) }} className='grid grid-cols-12 text-black'>
                                        <div className='col-span-6 py-2'>
                                            <IonText className='block'>{user.id}</IonText>
                                            <div className='flex gap-1'><IonText className='font-bold'>{user.fname}</IonText>
                                                <IonText>{user.lname}</IonText></div>
                                        </div>
                                        <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(user); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                    </div>
                                )}
                            </div>
                        </IonCardContent>
                    </IonCard>
                    <IonModal id='example-modal' isOpen={showModal}>
                        <IonContent>
                            <IonToolbar className='tool'>
                                <IonTitle>Détailles User</IonTitle>
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

export default Users;