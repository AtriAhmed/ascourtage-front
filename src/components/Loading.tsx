import React from 'react'
import './Loading.css'
import { IonPage } from '@ionic/react'

export default function Loading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="loader"></span>
        </IonPage>
    )
}
