import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonSelect, IonSelectOption, IonTextarea, IonToast } from '@ionic/react';
import { checkmarkCircle } from "ionicons/icons";
import { useHistory } from 'react-router';
import "./Ticket.css"
import { useState } from 'react';
import axios from 'axios';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

const Message: React.FC = () => {
  const history = useHistory();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function resetInputs(){
    setInputs({
        subject: "",
        email: "",
        message_body: ""
      })
  }

  const [inputs, setInputs] = useState({
    subject: "",
    email: "",
    message_body: ""
  });

  const handleInput = (e: any) => {
    const target = e.target as HTMLInputElement;
    setInputs((prevInputs) => ({ ...prevInputs, [target.name]: e.detail.value }));
  };

  const handleSubmit = () => {
    axios.post("/api/messages", inputs).then(res => {
        resetInputs();
      setIsOpen(true);
    }).catch((err: any) => {
      console.log(err);
    });
  };

  return (
    <IonPage id="main-content">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className='h-full'
      >
        <Header title='Message' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <IonContent>
          <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className='pl-[60px] pb-[48px]'>
            <IonItem>
              <IonSelect onIonChange={handleInput} value={inputs.subject} name='subject' label="Veuillez choisir un sujet" labelPlacement="floating">
                <IonSelectOption value="Suggestion">Suggestion</IonSelectOption>
                <IonSelectOption value="Demande de modification du RIB">Demande de modification du RIB</IonSelectOption>
                <IonSelectOption value="Réclamation">Réclamation</IonSelectOption>
                <IonSelectOption value="Autre demande">Autre demande</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput onIonInput={handleInput} value={inputs.email} name='email' label="Votre Email" labelPlacement="floating"></IonInput>
            </IonItem>
            <IonItem>
              <IonTextarea rows={4} onIonInput={handleInput} value={inputs.message_body} name='message_body' label='Contenu de votre message' labelPlacement="floating" />
            </IonItem>
            <IonButton className='m-3 blue' expand='block' onClick={handleSubmit}>Envoyer Message</IonButton>
          </div>
          <IonToast
            icon={checkmarkCircle}
            isOpen={isOpen}
            duration={5000}
            message="Message envoyé avec succès !"
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
  );
};

export default Message;
