import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonInput, IonAlert, IonBackButton } from '@ionic/react';
import { ban, menu, trash } from 'ionicons/icons';
import AdminSidebar from '../../components/layouts/admin/AdminSidebar';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useParams } from 'react-router';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const UserEdit: React.FC = () => {
    const { id }: { id: string } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [blockIsOpen, setBlockIsOpen] = useState(false);

    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        password_confirmation: '',
        active: 1
    });

    function getUser() {
        axios.get(`/api/users/${id}`).then(res => {
            setUser(res.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        if (id)
            getUser();
    }, [id])

    const handleInput = (e: any) => {
        const target = e.target as HTMLInputElement;
        setUser({ ...user, [target.name]: e.detail.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (user.password !== user.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.put(`/api/users/${id}`, user);
            setUser(response.data.user);
            setSuccess("User updated successfully");
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const activateAccount = () => {
        axios.put(`/api/users/activate/${id}`).then(res => {
            setUser((prevUser => ({ ...prevUser, active: 1 })));
            console.log("user account activated successfully")
        })
    }

    const blockUser = () => {
        axios.put(`/api/users/block/${id}`).then(res => {
            setUser((prevUser => ({ ...prevUser, active: 0 })));
            console.log("user blocked successfully")
        })
    }

    const deleteUser = () => {
        axios.delete(`/api/users/${id}`).then(res => {
            console.log("user deleted successfully")
        })
    }

    return (
        <IonPage>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                className='h-full'
            >
                <Header title='Modifier Utilisateur' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <IonContent>
                    <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <div className='pl-[60px]'>
                        <IonCard>
                            <IonCardContent className='relative'>
                                {!user.active ? <div className='bg-yellow-200 p-2'>
                                    <div className='text-red-500 text-center'>This account is blocked</div>
                                    <div className='flex'>
                                        <IonButton className='flex-1' onClick={activateAccount} color="success">Activate</IonButton>
                                        <IonButton className='flex-1' onClick={() => setDeleteIsOpen(true)} color="danger">Delete</IonButton>
                                    </div>
                                </div> : ""}
                                {user.active ? <div className='absolute top-0 left-0 w-full flex justify-between'><IonButton fill='clear' onClick={() => setBlockIsOpen(true)} disabled={!user.active}><IonIcon icon={ban} className='text-4xl' color='warning' /></IonButton> <IonButton fill='clear' onClick={() => setDeleteIsOpen(true)}><IonIcon icon={trash} className='text-4xl' color='danger' /></IonButton></div> : ""}
                                <IonImg src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
                                {loading ? <Loading type='' height='h-[calc(100vh-208px)]' /> : <>
                                    <IonInput type='text' label="Prenom" onIonInput={handleInput} value={user.fname} name='fname' labelPlacement="floating" />
                                    <IonInput type='text' label="Nom" onIonInput={handleInput} value={user.lname} name='lname' labelPlacement="floating" />
                                    <IonInput type='email' label="Email" onIonInput={handleInput} value={user.email} name='email' labelPlacement="floating" />
                                    <IonInput type='password' label="Mot de passe" onIonInput={handleInput} value={user.password} name='password' labelPlacement="floating" />
                                    <IonInput type='password' label="Confirmer le Mot de passe" onIonInput={handleInput} value={user.password_confirmation} name='password_confirmation' labelPlacement="floating" />
                                    <IonButton className='blue w-full font-bold' onClick={handleSubmit}>Mise à jour</IonButton>
                                </>
                                }
                            </IonCardContent>
                        </IonCard>
                    </div>
                </IonContent>
                {error && <IonAlert isOpen={true} onDidDismiss={() => setError(undefined)} message={error} buttons={['OK']} />}
                {success && <IonAlert isOpen={true} onDidDismiss={() => setSuccess(undefined)} message={success} buttons={['OK']} />}
                <IonAlert
                    header={`Are you sure you want to block the user ${user.fname} ${user.lname} ?`}
                    isOpen={blockIsOpen}
                    buttons={[
                        {
                            text: 'Annuler',
                            role: 'cancel',
                            handler: () => {

                            },
                        },
                        {
                            text: 'Oui',
                            role: 'confirm',
                            handler: blockUser,
                        },
                    ]}
                    onDidDismiss={() => setBlockIsOpen(false)}
                ></IonAlert>
                <IonAlert
                    header={`Are you sure you want to delete the user ${user.fname} ${user.lname}!`}
                    isOpen={deleteIsOpen}
                    buttons={[
                        {
                            text: 'Annuler',
                            role: 'cancel',
                            handler: () => {
                                console.log('Alert canceled');
                            },
                        },
                        {
                            text: 'Oui',
                            role: 'confirm',
                            handler: deleteUser,
                        },
                    ]}
                    onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
                ></IonAlert>
            </motion.div>
        </IonPage>
    );
};

export default UserEdit;
