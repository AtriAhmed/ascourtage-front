import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router';
import { motion } from "framer-motion"

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
          className='h-full'
        >

          <div className='h-full flex flex-col justify-center items-center bg-gradient-to-b from-primary via-blue-900 to-blue-700'>
            <div className='flex flex-col gap-[100px]'>
              <div className='flex flex-col gap-4 items-center'>
                <div className='text-white font-bold text-4xl'>Bienvenue à</div>
                <IonImg
                className='bg-white rounded-md'
                  src="/logo.png"
                  alt="ASCOURTAGE"
                ></IonImg>
              </div>


              <IonButton expand='block' shape="round" onClick={() => history.push("/login")} className='blue'>S'identifier</IonButton>
            </div>

          </div>

          {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
