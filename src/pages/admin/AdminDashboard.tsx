import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons } from '@ionic/react';
import { menu } from 'ionicons/icons';
import CustomSidebar from '../../components/CustomSidebar';
import { useAuthContext } from '../../context/AuthProvider';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';

const AdminDashboard: React.FC = () => {
    const { user }: { user: any } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);


    return (

        <IonPage id="main-content">
            <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <IonHeader>
                <IonToolbar className=''>
                    <IonButtons slot='start' className='ml-2'>
                        <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
                            <IonIcon icon={menu} className='' />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Admin Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='pl-[60px]'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-6'>
                            <IonCard>
                                <IonCardContent>
                                    Beaurdoraux
                                </IonCardContent>
                            </IonCard>
                        </div>
                        <div className='col-span-6'>
                            <IonCard>
                                <IonCardContent>
                                    Adherents
                                </IonCardContent>
                            </IonCard>
                        </div>
                        <div className='col-span-6'>
                            <IonCard>
                                <IonCardContent>
                                    Profile
                                </IonCardContent>
                            </IonCard>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default AdminDashboard;
