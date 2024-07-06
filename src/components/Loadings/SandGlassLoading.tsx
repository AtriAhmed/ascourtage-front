import React from 'react'
import './SandGlassLoading.css'
import { IonPage } from '@ionic/react'

export default function SandGlassLoading() {
    return (
        <IonPage className='h-screen flex justify-center items-center'>
            <span className="glass-loader"></span>
        </IonPage>
    )
}
