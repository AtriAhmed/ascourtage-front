import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { documentText, menu, people, person } from 'ionicons/icons';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import { useAuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/layouts/Header';

const ROUTES = [{
    path: '/admin/bordereaux',
    label: 'Bordereaux',
    icon: documentText
},
{
    path: '/admin/adherents',
    label: 'Adherents',
    icon: people
},
{
    path: '/profile',
    label: 'Profile',
    icon: person
},
]

const Dashboard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const history = useHistory();

    const [stats, setStats] = useState<number[]>([]);

    useEffect(() => {
        axios.get("/api/stats/user").then(res => {
            console.log(res.data)
            setStats([res.data.bordereauxNb, res.data.adherentsNb])
        })
    })

    return (
        <IonPage>
            <Header title='Dashboard' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <IonContent>
                <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <div className='pl-[60px]'>
                    <div className='grid grid-cols-12'>
                        {ROUTES.map((route, index) =>
                            <div key={index} className='col-span-6'>
                                {/* <Link to={route.path}> */}
                                <IonCard onClick={() => history.push(route.path)}>
                                    <IonCardContent className='flex flex-col items-center justify-center border-l-8 border-primary'>
                                        <div><IonIcon icon={route.icon} className='text-xl' /></div>
                                        <div>{stats[index]}</div>
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
