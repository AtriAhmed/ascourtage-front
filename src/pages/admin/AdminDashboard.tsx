import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { menu } from 'ionicons/icons';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { useHistory } from 'react-router';

const ROUTES = [{
    path: '/admin/bordereaux',
    label: 'Bordereaux'
},
{
    path: '/admin/adherents',
    label: 'Adherents'
},
{
    path: '/profile',
    label: 'Profile'
},
]

const AdminDashboard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const history = useHistory();

    return (

        <IonPage id="main-content">
            <IonHeader>
                <IonToolbar className=''>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Admin Dashboard</IonTitle>
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
                    <div className='grid grid-cols-12'>
                        {ROUTES.map((route, index) =>
                            <div key={index} className='col-span-6'>
                                {/* <Link to={route.path}> */}
                                <IonCard onClick={() => history.push(route.path)}>
                                    <IonCardContent className='border-l-8 border-primary'>
                                        {route.label}
                                    </IonCardContent>
                                </IonCard>
                                {/* </Link> */}
                            </div>
                        )}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default AdminDashboard;
