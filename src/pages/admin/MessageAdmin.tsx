import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonPage, IonSelect, IonSelectOption, IonText, IonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Loading from '../../components/Loading';
import { checkmarkCircle } from 'ionicons/icons';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const MessageAdmin: React.FC = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { id }: { id: string } = useParams();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<any>();

    function getMessage() {
        axios.get(`/api/messages/${id}`).then(res => {
            setMessage(res.data);
        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (id)
            getMessage();
    }, [id]);

    const changeStatus = (e: any) => {
        setIsSaving(true);
        axios.put(`/api/messages/${id}`, { status: e.target.value }).then(res => {
            setMessage((prevMessage:any) => ({ ...prevMessage, status: e.detail.value }));
            setIsOpen(true);
        }).catch((err: any) => {
            console.log("Sorry, there was an error");
        }).finally(() => setIsSaving(false));
    };

    if (loading) return <Loading type='page' />;

    return (
        <IonPage>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Message Admin' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonCard>
                            <IonCardHeader>
                                <div className='flex gap-4 justify-between items-center'>
                                    <IonText className='font-bold '>Message #{message?.id}</IonText>
                                    {isSaving ? "Saving..." : ""}
                                </div>
                                <IonSelect onIonChange={changeStatus} label='Status' className='flex-1' labelPlacement='floating' value={message?.status}>
                                    <IonSelectOption value="Nouveau">Nouveau</IonSelectOption>
                                    <IonSelectOption value="Répondu">Répondu</IonSelectOption>
                                    <IonSelectOption value="Terminé">Terminé</IonSelectOption>
                                </IonSelect>
                            </IonCardHeader>
                            <IonCardContent className='flex flex-col gap-2'>
                                <div>
                                    <IonText className='font-bold block'>Email:</IonText>
                                    <IonText>{message?.email}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Subject:</IonText>
                                    <IonText>{message?.subject}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Message Body:</IonText>
                                    <IonText>{message?.message_body}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Created:</IonText>
                                    <IonText>{message?.created_at}</IonText>
                                </div>
                                <div>
                                    <IonText className='font-bold block'>Updated:</IonText>
                                    <IonText>{message?.updated_at}</IonText>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </div>
                    <IonToast
                        icon={checkmarkCircle}
                        isOpen={isOpen}
                        duration={5000}
                        message="Message updated successfully!"
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
    );
};

export default MessageAdmin;
