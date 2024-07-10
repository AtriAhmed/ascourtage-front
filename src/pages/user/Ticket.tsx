import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmarkCircle, menu } from "ionicons/icons";
import { useHistory } from 'react-router';
import "./Ticket.css"
import { useState } from 'react';
import axios from 'axios';
import CustomSidebar from '../../components/CustomSidebar';
const Ticket: React.FC = () => {
  const history = useHistory();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [inputs, setInputs] = useState({
    subject: "",
    contactperson: "",
    content: ""
  });

  const handleInput = (e: any) => {
    const target = e.target as HTMLInputElement;
    setInputs((prevInputs) => ({ ...prevInputs, [target.name]: e.detail.value }))
  }

  const handleSubmit = () => {
    axios.post("/api/tickets", inputs).then(res => {
      setIsOpen(true);
    }).catch((err: any) => {
      console.log(err)
    })
  }

  return (
    <IonPage id="main-content">
      <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start' className='ml-2'>
            <IonButton onClick={() => { setIsExpanded(!isExpanded) }} fill='clear' className='text-blue'>
              <IonIcon icon={menu} className='' />
            </IonButton>
          </IonButtons>
          <IonTitle>Assistance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='pl-[60px]'>
          <IonItem>
            <IonSelect onIonChange={handleInput} value={inputs.subject} name='subject' label="Veuillez choisir un object" labelPlacement="floating">
              <IonSelectOption value="Suggestion">Suggestion</IonSelectOption>
              <IonSelectOption value="Demande de modification du RIB">Demande de modification du RIB</IonSelectOption>
              <IonSelectOption value="Réclamation">Réclamation</IonSelectOption>
              <IonSelectOption value="Autre demande" >Autre demande</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput onIonInput={handleInput} value={inputs.contactperson} name='contactperson' label="Personne de contact" labelPlacement="floating"></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea onIonInput={handleInput} value={inputs.content} name='content' label='Contenu de votre demande' labelPlacement="floating" />
          </IonItem>
          <IonButton className='m-5' expand='block' shape="round" onClick={handleSubmit}>Créer Ticket</IonButton>
        </div>
        <IonToast
          icon={checkmarkCircle}
          isOpen={isOpen}
          duration={5000}
          message="Ticket created successfully!"
          className="custom-toast"
          onDidDismiss={() => setIsOpen(false)}
          buttons={[
            {
              text: 'Dismiss',
              role: 'cancel',
            },
          ]}
        ></IonToast>
      </IonContent>
    </IonPage>
  )
};

export default Ticket;
