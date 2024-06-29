import React, { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonImg, IonText, IonIcon, IonButtons } from '@ionic/react';
import { menu } from 'ionicons/icons';

const Profile: React.FC = () => {


  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar className=''>
          <IonButtons slot='start' className='ml-2'>
            <IonButton fill='clear' className='text-blue'>
              <IonIcon icon={menu} className='' />
            </IonButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          {/* <IonButton slot="end" onClick={toggleMenu}>
            {isExpanded ? 'Collapse' : 'Expand'}
          </IonButton> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='pl-[60px]'>
          <IonCard>
            <IonCardContent>
              <IonImg className='' src='https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'></IonImg>
              <IonText className="text-black text-xl font-bold flex justify-center">01 STE ALFA DE COMMERCE</IonText>
              <IonText className="text-lg flex justify-center">@ste01</IonText>
              <div className='flex justify-center'><IonButton className='blue'>Editer les infos du compte</IonButton></div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Profile;
