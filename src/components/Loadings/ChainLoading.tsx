import React from 'react'
import './ChainLoading.css'
import { IonPage } from '@ionic/react'

export default function ChainLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="chain-loader"></span>
        </IonPage>
    )
}
