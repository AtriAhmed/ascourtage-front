import React from 'react'
import './CirclesLoading.css'
import { IonPage } from '@ionic/react'

export default function CirclesLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="circles-loader"></span>
        </IonPage>
    )
}
