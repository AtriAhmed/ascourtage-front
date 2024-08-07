import { IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { arrowDownCircle, download, menu, warning } from "ionicons/icons";
import { useHistory } from 'react-router';
import Loading from '../../components/Loading';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomSidebar from '../../components/layouts/user/UserSidebar';
import { useAuthContext } from '../../context/AuthProvider';
import { motion } from "framer-motion";
import Header from '../../components/layouts/Header';

function formatFileName(fileName: string) {
  return fileName.replace(/uploads\//g, '');
}

const Declaration: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();

  const [isExpanded, setIsExpanded] = useState(false);

  const [declarations, setDeclarations] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null); // State for the selected file
  const [uploading, setUploading] = useState(false); // State for upload process

  useEffect(() => {
    axios.get('/api/user-declarations')
      .then(res => {
        setDeclarations(res.data);
      }).catch((err: any) => {
        if (err.response.status == 401) window.location.pathname = "/login"
      }).finally(() => {
        setLoading(false)
      })
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user.id);

    setUploading(true);

    try {
      const response = await axios.post('https://sante.ascourtage.tn/users/upload-from-mobile.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      console.log('File uploaded successfully:', response.data);
      // Optionally, you can update the declarations list
      setDeclarations((prev: any) => [response.data, ...prev]);
    } catch (error) {
      // Handle error response
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
      setFile(null); // Reset the file input
    }
  };

  return (
    <IonPage>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className='h-full'
      >
        <Header title='Declaration Salaire' isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <IonContent className="">
          <CustomSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          <div className='pl-[60px] pb-[48px]'>
            <div className='bg-yellow-200 rounded p-2 m-2'>
              <IonText className='font-semibold flex items-center gap-2'>Merci de télécharger vos fichiers au format: xls ou xlsx <IonIcon icon={warning} className='text-4xl' /></IonText>
            </div>
            <div className='mx-2 px-2 pt-2 gap-2 flex flex-col'>
              <input type="file" className='rounded-lg' onChange={handleFileChange} />
              <IonButton onClick={handleUpload} disabled={uploading} className='blue'>Télécharger</IonButton>
            </div>
            <IonCard>
              <IonCardHeader className='bg-gray-100'>
                <IonCardTitle>Déclaration des salaires</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className=''>
                {loading ? <Loading type='' /> : <>
                  <div className='grid grid-cols-12 font-bold text-black'>
                    <div className='col-span-6 py-2'>Date</div>
                    <div className='col-span-6 py-2 justify-self-center place-self-center'>Fichier</div>
                  </div>
                  <div className='divide-y'>
                    {declarations.map((declaration: any) => (
                      <div key={declaration.id} className='grid grid-cols-12 text-black'>
                        <div className='col-span-4 py-2 flex flex-col '>
                          <IonText >{declaration.date}</IonText>
                        </div>
                        <a className='py-2 col-span-8 break-all flex flex-col justify-center items-center' download href={`https://sante.ascourtage.tn/users/${declaration.file}`}>
                          {formatFileName(declaration.file)}
                          <IonIcon icon={arrowDownCircle} className='text-2xl text-primary' />
                        </a>
                      </div>
                    ))}
                  </div>
                </>}
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </motion.div>
    </IonPage>
  );
};

export default Declaration;
