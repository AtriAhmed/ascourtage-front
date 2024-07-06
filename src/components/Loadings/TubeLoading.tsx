import React from 'react'
import './TubeLoading.css'
import { IonPage } from '@ionic/react'

export default function TubeLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="tube-loader"></span>
        </IonPage>
    )
}
