import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthProvider';
import { useHistory } from 'react-router';

const AdherentDetails: React.FC = () => {
  const { user, userLoading } = useAuthContext();
  const history = useHistory();
  const [adherent, setAdherent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only send the request if user is loaded
    if (!userLoading && user) {
      axios.get(`/api/adherents/${user.code_matricule_id}`)
        .then(res => {
          setAdherent(res.data);
        })
        .catch(err => {
          console.error(err);
          if (err.response && err.response.status === 401) {
            history.push('/login');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, userLoading, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/adherent/dashboard" />
          </IonButtons>
          <IonTitle>Détails Adhérent</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonLoading isOpen={loading} message="Chargement..." />
        ) : adherent ? (
          <div>
            <IonText>
              <h2 className='font-bold'>{adherent.nom} {adherent.prenom}</h2>
            </IonText>
            <p><strong>Matricule:</strong> {adherent.matricule}</p>
            <p><strong>Date d'affiliation:</strong> {adherent.dateaffiliation}</p>
            <p><strong>Date de naissance:</strong> {adherent.datenaissance}</p>
            <p><strong>RIB:</strong> {adherent.rib}</p>
            <p><strong>État:</strong> {adherent.etatactuel}</p>
            <p><strong>Situation familiale:</strong> {adherent.situationfamiliale}</p>
          </div>
        ) : (
          <IonText>Aucun adhérent trouvé.</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AdherentDetails;
