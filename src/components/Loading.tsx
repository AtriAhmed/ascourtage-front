import React from 'react'
import './Loading.css'
import { IonContent, IonPage } from '@ionic/react'

export default function Loading({ type, height }: { type: string, height?: string }) {
    if (type == "page")
        return (
            <IonPage className='h-screen flex justify-center items-center bg-white'>
                <span className="circles-loader"></span>
            </IonPage>
        )
    else
        return <div className={`${height} flex justify-center items-center bg-white`}>
            <span className="circles-loader"></span>
        </div>
}
