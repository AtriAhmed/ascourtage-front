import React from 'react'
import Modal from '../../Modal'
import { IonContent, IonText } from '@ionic/react'
import User from '../../../models/User'

export default function ShowUser({ show, setShow, toView }: { toView: User, show: boolean, setShow: (state: boolean) => any }) {
    return (
        <Modal title='Detail Utilisateur' show={show} setShow={setShow}>
            <IonContent>
                <div className='ion-padding flex flex-col gap-2'>

                    <div className='flex gap-2'>
                        <IonText className='font-bold'>ID:</IonText>
                        <IonText className=''>{toView?.id}</IonText>
                    </div>
                    <div className='flex gap-2'>
                        <IonText className='font-bold'>Username:</IonText>
                        <IonText className=''>{toView?.username}</IonText>
                    </div>
                    <div className='flex gap-2'>
                        <IonText className='font-bold'>Name:</IonText>
                        <IonText className=''>{toView?.fname} {toView?.lname}</IonText>
                    </div>
                    <div className='flex gap-2'>
                        <IonText className='font-bold'>Email:</IonText>
                        <IonText className=''>{toView?.email}</IonText>
                    </div>
                    <div className='flex gap-2'>
                        <IonText className='font-bold'>Last Sign In:</IonText>
                        <IonText className=''>{toView?.last_login}</IonText>
                    </div>
                </div>
            </IonContent>
        </Modal>
    )
}
