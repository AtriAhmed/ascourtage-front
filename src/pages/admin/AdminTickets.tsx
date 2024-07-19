import { IonAccordion, IonAccordionGroup, IonAvatar, IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { menuController } from '@ionic/core/components';
import { add, arrowBack, menu, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminTickets.css'
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const AdminTickets: React.FC = () => {
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTickets = (query: string) => {
        setLoading(true);
        axios.get('/api/tickets', {
            params: { query }
        }).then(res => {
            setTickets(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchTickets = useCallback(debounce(fetchTickets, 500), []);

    useEffect(() => {
        debouncedFetchTickets(searchQuery);
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
                <Header title='Tickets' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Liste des Tickets</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className='p-1 text-xs'>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> : <>
                                    <div className='grid grid-cols-12 font-bold text-black'>
                                        <div className='col-span-3 py-2'>User</div>
                                        <div className='col-span-4 py-2'>Sujet</div>
                                        <div className='col-span-4 py-2'>Date</div>
                                    </div>
                                    <div className='divide-y'>
                                        {tickets.map((ticket: any) =>
                                            <div key={ticket.id} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/admin/tickets/${ticket.id}`) }} className='grid grid-cols-12 text-black'>
                                                <div className='col-span-3 py-2 place-self-center justify-self-start'>
                                                    <IonText className='' >{ticket.user_name}</IonText>
                                                </div>
                                                <div className='col-span-4 py-2 place-self-center justify-self-start break-all'>
                                                    <IonText className=''>{ticket.subject}</IonText>
                                                </div>
                                                <div className='col-span-4 py-2 place-self-center'>
                                                    <IonText className=''>{ticket.created}</IonText>
                                                </div>
                                                <div className='py-2 col-span-1 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(ticket); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
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
                                    <IonTitle>Détailles Ticket</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton color="light" onClick={() => setShowModal(false)}>
                                            Fermer
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className='ion-padding'>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>User:</IonText>
                                        <IonText className=''>{toView?.user_name}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Agent:</IonText>
                                        <IonText className=''>{toView?.agent}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Subject:</IonText>
                                        <IonText className=''>{toView?.subject}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Status:</IonText>
                                        <IonText className=''>{toView?.status}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Department:</IonText>
                                        <IonText className=''>{toView?.category}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Created:</IonText>
                                        <IonText className=''>{toView?.created}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Last updated:</IonText>
                                        <IonText className=''>{toView?.last_updated}</IonText>
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

export default AdminTickets;