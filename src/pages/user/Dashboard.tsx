import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { menu } from 'ionicons/icons';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import { useAuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const ROUTES = [{
    path: '/bordereaux',
    label: 'Bordereaux'
},
{
    path: '/adherents',
    label: 'Adherents'
},
{
    path: '/profile',
    label: 'Profile'
},
]

const Dashboard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Dashboard</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
                            <IonIcon icon={menu} className='' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
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

export default Dashboard;
