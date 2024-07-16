import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { menu } from 'ionicons/icons';
import UserSidebar from '../components/layouts/user/UserSidebar';
import { useAuthContext } from '../context/AuthProvider';
import User from '../models/User';
import Loading from '../components/Loading';
import { useHistory } from 'react-router';
import AdminSidebar from '../components/layouts/admin/AdminSidebar';

const Profile: React.FC = () => {
  const { user }: { user: User } = useAuthContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();

  if (!user) return <Loading type='page' />

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar className=''>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
              <IonIcon icon={menu} className='' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user.account_owner ? <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} /> : <UserSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />}
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
