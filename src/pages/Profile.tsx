import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons } from '@ionic/react';
import { menu } from 'ionicons/icons';
import UserSidebar from '../components/layouts/user/UserSidebar';
import { useAuthContext } from '../context/AuthProvider';
import User from '../models/User';
import Loading from '../components/Loading';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
  const { user }: { user: User } = useAuthContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();

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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UserSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div className='pl-[60px]'>
          <IonCard>
            <IonCardContent>
              <IonImg className='' src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
              <IonText className="text-black text-xl font-bold flex justify-center">{user?.lname + " " + user?.fname}</IonText>
              <IonText className="text-lg flex justify-center">@{user?.username}</IonText>
              <div className='flex justify-center'><IonButton className='blue' onClick={() => history.push('/profile/edit')}>Editer les infos du compte</IonButton></div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Profile;
