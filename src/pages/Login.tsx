import { IonBadge, IonButton, IonButtons, IonCard, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import './Login.css'
import { Keyboard } from '@capacitor/keyboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthProvider';
import Loading from '../components/Loading';
import { motion } from "framer-motion"
const isEmail = (input: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

const Login: React.FC = () => {

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });
  });

  const { setUser } = useAuthContext()

  const [error, setError] = useState<string>()

  const [loginInput, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleInput = (e: any) => {
    const target = e.target as HTMLInputElement;
    setLogin({ ...loginInput, [target.name]: e.detail.value })
  }

  function handleSubmit() {

    const data: any = { password: loginInput.password }

    if (isEmail(loginInput.username))
      data.email = loginInput.username;
    else
      data.username = loginInput.username;

    axios.post('/api/login', data).then(res => {
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token);
      if (res.data.user.account_owner > 0) window.location.pathname == "/admin/dashboard";
      else
        window.location.pathname == "/dashboard";
    }
    ).catch((err: any) => {
      const response = err?.response;
      console.log(response)
      if (response.status == 401)
        setError("username ou mot de passe Incorrect")
    }
    )
  }

  return (
    <IonPage>

      <IonContent fullscreen>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
          className='h-full'
        >
          <div className='h-full flex flex-col justify-between items-center'>
            <div className={`h-full flex items-center ${keyboardIsOpen ? 'hidden' : ''}`} >
              <IonImg
                src="https://sante.ascourtage.tn/users/images/logo.png"
                alt="ASCOURTAGE"
                className='w-[200px]'
              ></IonImg>
            </div>
            <div className='flex flex-col gap-5 w-full p-10 pt-16 h-full rounded-t-[100px]' style={keyboardIsOpen ? {} : { boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 50px 0px" }}>
              <div className='text-xl font-bold text-primary'>Se connecter</div>
              <IonItem>
                <IonInput type='text' label="Nom d'utilisateur" onIonInput={handleInput} value={loginInput.username} name='username' labelPlacement="floating" />
              </IonItem>
              <IonItem>
                <IonInput type='password' label="Mot de passe" name="password" onIonInput={handleInput} value={loginInput.password} labelPlacement="floating" />
              </IonItem>
              <span className='text-red-500'>
                {error}
              </span>
              <IonButton className='blue' expand='block' shape="round" onClick={(e) => handleSubmit()}>S'identifier</IonButton>

            </div>
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
