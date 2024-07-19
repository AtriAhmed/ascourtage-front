import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { checkmarkCircle, menu } from "ionicons/icons";
import { useHistory } from 'react-router';
import "./Ticket.css"
import { useState } from 'react';
import axios from 'axios';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import { motion } from "framer-motion"
import Header from '../../components/layouts/Header';

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
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className='h-full'
      >
        <Header title='Ticket' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <IonContent>
          <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className='pl-[60px] pb-[48px]'>
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
              <IonTextarea rows={4} onIonInput={handleInput} value={inputs.content} name='content' label='Contenu de votre demande' labelPlacement="floating" />
            </IonItem>
            <IonButton className='m-3 blue' expand='block' onClick={handleSubmit}>Créer Ticket</IonButton>
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
      </motion.div>
    </IonPage>
  )
};

export default Ticket;
