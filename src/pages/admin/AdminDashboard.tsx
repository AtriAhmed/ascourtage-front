import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonIcon, IonButtons, IonBackButton, useIonRouter } from '@ionic/react';
import { arrowBack, documentText, menu, people, person } from 'ionicons/icons';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { useHistory } from 'react-router';
import axios from 'axios';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
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

const AdminDashboard: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const history = useHistory();
    const router = useIonRouter();

    const [stats, setStats] = useState<number[]>([]);

    useEffect(() => {
        axios.get("/api/stats").then(res => {
            setStats([res.data.bordereauxNb, res.data.adherentsNb]);
        }).catch((err: any) => {
            if (err.response.status == 401) {
                router.push("/login")
            }
        })
    }, [])

    return (

        <IonPage>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Admin Dashboard' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px]'>
                        <div className='grid grid-cols-12'>
                            {ROUTES.map((route, index) =>
                                <div key={index} className='col-span-6'>
                                    <Link to={route.path}>
                                        <IonCard>
                                            <IonCardContent className='flex flex-col items-center justify-center border-l-8 border-primary'>
                                                <div><IonIcon icon={route.icon} className='text-xl' /></div>
                                                <div className=''>{stats[index]}</div>
                                                {route.label}
                                            </IonCardContent>
                                        </IonCard>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </IonContent>
            </motion.div>
        </IonPage>
    )
};

export default AdminDashboard;
