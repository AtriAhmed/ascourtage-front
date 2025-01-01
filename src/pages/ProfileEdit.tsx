import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonInput, IonAlert, IonBackButton } from '@ionic/react';
import { menu, trash } from 'ionicons/icons';
import UserSidebar from '../components/layouts/user/UserSidebar';
import { useAuthContext } from '../context/AuthProvider';
import User from '../models/User';
import Loading from '../components/Loading';
import axios from 'axios';
import AdminSidebar from '../components/layouts/admin/AdminSidebar';
import Header from '../components/layouts/Header';

const ProfileEdit: React.FC = () => {
    const { user, setUser }: { user: User, setUser: (user: User) => void } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [loginInput, setLogin] = useState({
        fname: user?.fname || '',
        lname: user?.lname || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        oldPassword: ''
    });

    const handleInput = (e: any) => {
        const target = e.target as HTMLInputElement;
        setLogin({ ...loginInput, [target.name]: e.detail.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (loginInput.password !== loginInput.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.put(`/api/profile`, loginInput);
            setUser(response.data.user);
            setSuccess("Profile mise à jour avec succéss");
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    if (!user) return <Loading type='page' />;

    return (
        <IonPage id="main-content">
            <Header title='Modifier Profile' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <IonContent>
                {user.account_owner ? <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} /> : <UserSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />}
                <div className='pl-[60px] pb-[48px]'>
                    <IonCard>
                        <IonCardContent>
                            <IonImg src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
                            <IonInput type='text' label="Prenom" onIonInput={handleInput} value={loginInput.fname} name='fname' labelPlacement="floating" />
                            <IonInput type='text' label="Nom" onIonInput={handleInput} value={loginInput.lname} name='lname' labelPlacement="floating" />
                            <IonInput type='email' label="Email" onIonInput={handleInput} value={loginInput.email} name='email' labelPlacement="floating" />
                            <IonInput type='password' label="Mot de passe" onIonInput={handleInput} value={loginInput.password} name='password' labelPlacement="floating" />
                            <IonInput type='password' label="Confirmer le Mot de passe" onIonInput={handleInput} value={loginInput.password_confirmation} name='password_confirmation' labelPlacement="floating" />
                            <IonInput type='password' label="Ancien Mot de passe" onIonInput={handleInput} value={loginInput.oldPassword} name='oldPassword' labelPlacement="floating" />
                            <IonButton className='blue w-full font-bold' onClick={handleSubmit}>Mise à jour</IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
            {error && <IonAlert isOpen={true} onDidDismiss={() => setError(undefined)} message={error} buttons={['OK']} />}
            {success && <IonAlert isOpen={true} onDidDismiss={() => setSuccess(undefined)} message={success} buttons={['OK']} />}
        </IonPage>
    );
};

export default ProfileEdit;
