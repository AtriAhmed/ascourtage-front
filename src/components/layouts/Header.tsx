import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack, menu } from 'ionicons/icons';
import React from 'react'
import { useHistory } from 'react-router'

export default function Header({ title, setIsExpanded, isExpanded }: { title: string, setIsExpanded: (state: boolean) => any, isExpanded: boolean }) {
    const history = useHistory();

    return (
        <IonHeader>
            <IonToolbar className='px-3'>
                <IonButtons slot="start">
                    <IonButton fill='clear' onClick={() => history.goBack()}>
                        <IonIcon icon={arrowBack} className='text-xl'></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot='end' className='ml-2'>
                    <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
                        <IonIcon icon={menu} className='' />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}
