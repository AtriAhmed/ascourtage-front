import React from 'react'
import './VibrationLoading.css'
import { IonPage } from '@ionic/react'

export default function VibrationLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="vibration-loader"></span>
        </IonPage>
    )
}
