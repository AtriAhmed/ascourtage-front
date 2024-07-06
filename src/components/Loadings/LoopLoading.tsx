import React from 'react'
import './LoopLoading.css'
import { IonPage } from '@ionic/react'

export default function LoopLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="loop-loader"></span>
        </IonPage>
    )
}
