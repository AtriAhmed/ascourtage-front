import React from 'react'
import './TurningBallsLoading.css'
import { IonPage } from '@ionic/react'

export default function TurningBallsLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="turning-circles-loader"></span>
        </IonPage>
    )
}
