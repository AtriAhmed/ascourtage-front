import { IonBadge, IonButton, IonButtons, IonCard, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { add } from "ionicons/icons";
import { useHistory } from 'react-router';
import './Login.css'
import { Keyboard } from '@capacitor/keyboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthProvider';

const Login: React.FC = () => {

  const [loading, setLoading] = useState(true);

  const [userStatus, setUserStatus] = useState(false)

  useEffect(() => {
    axios.get("api/user/status").then(res => {
      setUserStatus(true)
    }).catch(() => {
      setUserStatus(false);
    }).finally(() => {
      setLoading(false)
    })
  })

  const history = useHistory();

  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      console.log("hello")
      setKeyboardIsOpen(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      console.log("hello")
      setKeyboardIsOpen(false);
    });
  });

  const { setUser } = useAuthContext()
  //   const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()

  const [error, setError] = useState<string>()

  const [loginInput, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleInput = (e: any) => {
    const target = e.target as HTMLInputElement;
    setLogin({ ...loginInput, [target.name]: e.detail.value })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    axios.post('/api/login', { username: loginInput.username, password: loginInput.password }).then(res => {
      console.log(res.data)
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token);
      // if (res.data.user.role > 0) navigate("/admin");
      // else 
      history.push("/dashboard");
    }
    ).catch((err: any) => {
      console.log(err)
      const response = err?.response;
      console.log(response)
      if (response.status == 401)
        setError("username ou mot de passe Incorrect")
    }
    )
  }

  useEffect(() => {
    if (userStatus) history.push("/dashboard")
  }, [userStatus])

  if (userStatus || loading) return "Loading";

  return (
    <IonPage>

      <IonContent fullscreen>
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
            <IonButton className='blue' expand='block' shape="round" onClick={(e) => handleSubmit(e)}>S'identifier</IonButton>

          </div>
        </div>

        {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default Login;
