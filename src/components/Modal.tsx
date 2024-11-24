import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import React, { ReactNode } from 'react'
import "./Modal.css"

export default function Modal({ children, title, show, setShow }: { title: string, children: ReactNode, show: boolean, setShow: (state: boolean) => any }) {

    return (
        <IonModal id='example-modal' isOpen={show} onDidDismiss={() => setShow(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setShow(false)}>
                            Fermer
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {children}
        </IonModal>
    )
}
