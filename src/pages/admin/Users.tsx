import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { add, menu, searchCircle, searchCircleOutline } from "ionicons/icons";
import { useHistory } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import axios from 'axios';
import Loading from '../../components/Loading';
import './Users.css'
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import { debounce } from 'lodash';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';
import AddUser from '../../components/admin/users/AddUser';
import ShowUser from '../../components/admin/users/ShowUser';

const Users: React.FC = () => {
    const history = useHistory();

    const [isExpanded, setIsExpanded] = useState(false);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = (query: string) => {
        setLoading(true);
        axios.get('/api/users', {
            params: { query }
        }).then(res => {
            setUsers(res.data);
        }).catch((err: any) => {
            if (err.response.status == 401) window.location.pathname = "/login"
        }).
            finally(() => {
                setLoading(false);
            });
    };

    const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

    useEffect(() => {
        debouncedFetchUsers(searchQuery);
    }, [searchQuery]);

    const handleSearchChange = (e: CustomEvent) => {
        setSearchQuery(e.detail.value);
    };

    const [toView, setToView] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <IonPage>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Utilisateurs' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px] pb-[48px]'>
                        <IonSearchbar value={searchQuery} onIonInput={handleSearchChange} autocapitalize='none'></IonSearchbar>
                        <IonCard>
                            <IonCardHeader className='bg-gray-100 flex flex-row justify-between items-center'>
                                <IonCardTitle>Liste des Users</IonCardTitle>
                                {/* <IonButton className='blue' onClick={() => setShowAddModal(true)}><IonIcon icon={add} className='text-2xl px-2' /></IonButton> */}
                            </IonCardHeader>
                            <IonCardContent className=''>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> : <>
                                    <div className='grid grid-cols-12 font-bold text-black'>
                                        <div className='col-span-6 py-2'>User</div>
                                        <div className='col-span-6 py-2 justify-self-center place-self-center'>Action</div>
                                    </div>
                                    <div className='divide-y'>
                                        {users.map((user: any) =>
                                            <div key={user.id} onClick={(e: any) => { if (!e.target.closest(".view")) history.push(`/admin/users/${user.id}`) }} className='grid grid-cols-12 text-black'>
                                                <div className='col-span-6 py-2'>
                                                    <IonText className='block'>{user.id}</IonText>
                                                    <div className='flex gap-1'><IonText className='font-bold'>{user.fname}</IonText>
                                                        <IonText>{user.lname}</IonText></div>
                                                </div>
                                                <div className='py-2 col-span-6 justify-self-center place-self-end'><IonButton className='view' fill='clear' id="open-modal" onClick={() => { setToView(user); setShowModal(true) }}><IonIcon icon={searchCircle} className='text-3xl text-primary' /></IonButton> </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                                }
                            </IonCardContent>
                        </IonCard>
                        <ShowUser toView={toView} show={showModal} setShow={setShowModal} />
                        <AddUser show={showAddModal} setShow={setShowAddModal} />
                    </div>
                </IonContent>
            </motion.div>
        </IonPage>
    )
};

export default Users;