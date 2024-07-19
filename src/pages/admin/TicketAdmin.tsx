import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonPage, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loading from '../../components/Loading';
import { checkmarkCircle, menu, save } from 'ionicons/icons';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const TicketAdmin: React.FC = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [isExpanded, setIsExpanded] = useState(false);

    const { id }: { id: string } = useParams();

    const [loading, setLoading] = useState(true);

    const [ticket, setTicket] = useState<Ticket>();

    function getTicket() {
        axios.get(`/api/tickets/${id}`).then(res => {
            setTicket(res.data);
        }).catch((err: any) => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (id)
            getTicket()
    }, [])

    const changeStatus = (e: any) => {
        setIsSaving(true);
        axios.put(`/api/tickets/${id}`, { status: e.target.value }).then(res => {
            setTicket((prevTicket) => ({ ...prevTicket, status: e.detail.value } as Ticket))
            setIsOpen(true);
        }).catch((err: any) => {
            console.log("sorry there was an error");
        }).finally(() => setIsSaving(false))
    }

    const changeIsClosed = () => {
        setIsSaving(true);
        if (ticket?.closed) {
            axios.put(`/api/tickets/open/${id}`).then((res) => {
                setTicket((prevTicket) => ({ ...prevTicket, closed: 0 } as Ticket))
                setIsOpen(true);
            }).catch((err: any) => {
                console.log("there was an error")
            }).finally(() => setIsSaving(false))
        } else {
            axios.put(`/api/tickets/close/${id}`).then((res) => {
                setTicket((prevTicket) => ({ ...prevTicket, closed: 1 } as Ticket))
                getTicket();
                setIsOpen(true);
            }).catch((err: any) => {
                console.log("there was an error")
            }).finally(() => setIsSaving(false))
        }
    }

    if (loading) return <Loading type='page' />

    return (
        <IonPage>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Ticket' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonCard>
                            <IonCardHeader>
                                <div className='flex gap-4 justify-between items-center'>
                                    <IonText className='font-bold '>Ticket #{ticket?.id}</IonText>
                                    {isSaving ? "saving..." : ""}
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <IonSelect onIonChange={changeStatus} label='Status' className='flex-1' labelPlacement='floating' value={ticket?.status}>
                                        <IonSelectOption>
                                            Nouveau
                                        </IonSelectOption>
                                        <IonSelectOption>
                                            Répondu
                                        </IonSelectOption>
                                        <IonSelectOption>
                                            Terminé
                                        </IonSelectOption>
                                    </IonSelect>

                                    <IonButton className='flex-1' onClick={changeIsClosed} color={ticket?.closed ? "success" : "danger"}>{ticket?.closed ? "Open" : "Close"}</IonButton>
                                </div>
                            </IonCardHeader>
                            <IonCardContent className='flex flex-col gap-2'>
                                <div>
                                    <IonText className='font-bold block'>User ID:</IonText>
                                    <IonText>{ticket?.user}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>User Name:</IonText>
                                    <IonText>{ticket?.user_name}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Created:</IonText>
                                    <IonText>{ticket?.created}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Updated:</IonText>
                                    <IonText>{ticket?.last_updated}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Object:</IonText>
                                    <IonText>{ticket?.subject}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Personne de contact:</IonText>
                                    <IonText>{ticket?.contactperson}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Contenu:</IonText>
                                    <IonText>{ticket?.contenu}</IonText>
                                </div>
                                {/* <div>
                                <IonTextarea label='Comment' labelPlacement='floating' />
                            </div>
                            <IonButton className='blue'>Submit Comment</IonButton> */}

                            </IonCardContent>
                        </IonCard>
                    </div>
                    <IonToast
                        icon={checkmarkCircle}
                        isOpen={isOpen}
                        duration={5000}
                        message="Ticket updated successfully!"
                        className="custom-toast"
                        onDidDismiss={() => setIsOpen(false)}
                        buttons={[
                            {
                                text: 'Dismiss',
                                role: 'cancel',
                            },
                        ]}
                    ></IonToast>
                </IonContent>
            </motion.div>
        </IonPage>
    )
}

export default TicketAdmin