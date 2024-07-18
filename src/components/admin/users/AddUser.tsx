import React, { useState } from 'react'
import Modal from '../../Modal'
import { IonButton, IonContent, IonFooter, IonInput, IonItem, IonLabel, IonList, IonText, IonToolbar } from '@ionic/react'
import axios from 'axios';

export default function AddUser({ show, setShow }: { show: boolean, setShow: (state: boolean) => any }) {

    const [errors, setErrors] = useState<any>({});
    const [inputs, setInputs] = useState({
        username: "",
        fname: "",
        lname: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const handleInput = (e: any) => {
        setInputs((prevInputs: any) => ({ ...prevInputs, [e.target.name]: e.detail.value }))
    }

    const handleSave = () => {
        axios.post("/api/users", inputs).then(res => {
            console.log("user created successfully")
            setShow(false);
        }).catch((err: any) => {
            setErrors(err.response.data.errors);
            console.log(err.response)
        })
    };

    return (
        <Modal title="Add User" show={show} setShow={setShow}>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput name='username' value={inputs.username} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.username && <IonText color="danger">{errors.username}</IonText>}

                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput name='lname' value={inputs.lname} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.lname && <IonText color="danger">{errors.lname}</IonText>}

                    <IonItem>
                        <IonLabel position="floating">Prenom</IonLabel>
                        <IonInput name='fname' value={inputs.fname} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.fname && <IonText color="danger">{errors.fname}</IonText>}

                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput name='email' value={inputs.email} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.email && <IonText color="danger">{errors.email}</IonText>}

                    <IonItem>
                        <IonLabel position="floating">Mot de passe</IonLabel>
                        <IonInput name='password' type='password' value={inputs.password} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.password && <IonText color="danger">{errors.password}</IonText>}

                    <IonItem>
                        <IonLabel position="floating">Confirmation Mot de passe</IonLabel>
                        <IonInput name='password_confirmation' type='password' value={inputs.password_confirmation} onIonInput={handleInput}></IonInput>
                    </IonItem>
                    {errors.password_confirmation && <IonText color="danger">{errors.password_confirmation}</IonText>}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton expand="full" className='blue' onClick={handleSave}>Save</IonButton>
                    <IonButton expand="full" color="light" onClick={() => setShow(false)}>Cancel</IonButton>
                </IonToolbar>
            </IonFooter>
        </Modal>
    )
}
