import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonInput } from '@ionic/react';
import { menu } from 'ionicons/icons';
import UserSidebar from '../components/layouts/user/UserSidebar';
import { useAuthContext } from '../context/AuthProvider';
import User from '../models/User';
import Loading from '../components/Loading';
import axios from 'axios';

const ProfileEdit: React.FC = () => {
    const { user }: { user: User } = useAuthContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const [error, setError] = useState<string>();

  const [loginInput, setLogin] = useState({
    fname: '',
    lname: '',
    email:'',
    password: '',
    passwordConfirmation:'',
    oldPassword:''
  })

  const handleInput = (e: any) => {
    const target = e.target as HTMLInputElement;
    setLogin({ ...loginInput, [target.name]: e.detail.value })
  }

  const handleSubmit =(e:any)=>{
    axios.put(`/profile`, loginInput).then((res=>{
        console.log("success")
    })).catch((err:any)=>{
        console.log(err)
    })
  }

    if (!user) return <Loading type='page' />

    return (

        <IonPage id="main-content">
            <IonHeader>
                <IonToolbar className=''>
                    <IonButtons slot='start' className='ml-2'>
                        <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
                            <IonIcon icon={menu} className='' />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Modifier Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <UserSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                <div className='pl-[60px]'>
                    <IonCard>
                        <IonCardContent>
                            <IonImg className='' src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
                            <IonInput type='text' label="Prenom" onIonInput={handleInput} value={loginInput.fname} name='fname' labelPlacement="floating" />
                            <IonInput type='text' label="Nom" onIonInput={handleInput} value={loginInput.lname} name='lname' labelPlacement="floating" />
                            <IonInput type='email' label="Email" onIonInput={handleInput} value={loginInput.email} name='email' labelPlacement="floating" />
                            <IonInput type='password' label="Mot de passe" onIonInput={handleInput} value={loginInput.password} name='password' labelPlacement="floating" />
                            <IonInput type='password' label="Confirmer le Mot de passe" onIonInput={handleInput} value={loginInput.passwordConfirmation} name='passwordConfirmation' labelPlacement="floating" />
                            <IonInput type='password' label="Ancien Mot de passe" onIonInput={handleInput} value={loginInput.oldPassword} name='oldPassword' labelPlacement="floating" />
                            <div className='flex justify-center'><IonButton className='blue' onClick={handleSubmit}>Mise a jour</IonButton></div>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    )
};

export default ProfileEdit;
