import React from 'react'
import './TurningBoxesLoading.css'
import { IonPage } from '@ionic/react'

export default function TurningBoxesLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="turning-boxes-loader"></span>
        </IonPage>
    )
}
