import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonModal, IonPage, IonSearchbar, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { menuController } from '@ionic/core/components';
import { searchCircle } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './AdminTickets.css';
import Loading from '../../components/Loading';
import { debounce } from 'lodash';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const AdminMessages: React.FC = () => {
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchMessages = (query: string) => {
        setLoading(true);
        axios.get('/api/messages', {
            params: { query }
        }).then(res => {
            setMessages(res.data);
        }).catch((err: any) => {
            if (err.response.status === 401) window.location.pathname = "/login";
        }).finally(() => {
            setLoading(false);
        });
    };

    const debouncedFetchMessages = useCallback(debounce(fetchMessages, 500), []);

    useEffect(() => {
        debouncedFetchMessages(searchQuery);
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
                <Header title='Messages' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100'>
                                <IonCardTitle>Liste des Messages</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className='p-1 text-xs'>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> : (
                                    <>
                                        <div className='grid grid-cols-12 font-bold text-black gap-1'>
                                            <div className='col-span-4 py-2'>Email</div>
                                            <div className='col-span-5 py-2'>Sujet</div>
                                            <div className='col-span-2 py-2'>Date</div>
                                        </div>
                                        <div className='divide-y'>
                                            {messages.map((message: any) => (
                                                <div key={message.id} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/admin/messages/${message.id}`); }} className='grid grid-cols-12 gap-1 text-black'>
                                                    <div className='col-span-4 py-2 place-self-center justify-self-start'>
                                                        <IonText className='break-all'>{message.email}</IonText>
                                                    </div>
                                                    <div className='col-span-5 py-2 place-self-center justify-self-start break-all'>
                                                        <IonText>{message.subject}</IonText>
                                                    </div>
                                                    <div className='col-span-2 py-2 place-self-center'>
                                                        <IonText>{message.created_at}</IonText>
                                                    </div>
                                                    <div className='py-2 col-span-1 justify-self-center place-self-end'>
                                                        <IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(message); setShowModal(true); }}>
                                                            <IonIcon icon={searchCircle} className='text-3xl text-primary' />
                                                        </IonButton>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </IonCardContent>
                        </IonCard>
                        <IonModal id='example-modal' isOpen={showModal}>
                            <IonContent>
                                <IonToolbar className='tool'>
                                    <IonTitle>Détails du Message</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton color="light" onClick={() => setShowModal(false)}>
                                            Fermer
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                <div className='ion-padding'>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Email:</IonText>
                                        <IonText>{toView?.email}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Sujet:</IonText>
                                        <IonText>{toView?.subject}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Message:</IonText>
                                        <IonText>{toView?.message_body}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Status:</IonText>
                                        <IonText>{toView?.status}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Créé:</IonText>
                                        <IonText>{toView?.created_at}</IonText>
                                    </div>
                                    <div className='flex gap-2'>
                                        <IonText className='font-bold'>Mis à jour:</IonText>
                                        <IonText>{toView?.updated_at}</IonText>
                                    </div>
                                </div>
                            </IonContent>
                        </IonModal>
                    </div>
                </IonContent>
            </motion.div>
        </IonPage>
    );
};

export default AdminMessages;
