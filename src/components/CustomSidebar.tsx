import React from 'react';
import { IonIcon, IonItem, IonList } from '@ionic/react';
import { peopleOutline, cashOutline, homeOutline, personOutline, helpCircleOutline, logOutOutline, people, cash, home, helpCircle, person, logOut } from 'ionicons/icons';
import { useHistory } from 'react-router';

const BUTTON_STYLE = "text-2xl !text-[#082374] flex justify-start items-center gap-2 relative";

const LABEL_STYLE = "text-sm absolute pl-10 truncate";

const CustomSidebar: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
    const history = useHistory();

    const navigateAndCloseMenu = (path: string) => {
        history.push(path);
    };

    return (
        <div className='flex flex-col gap-4 p-4'>

            <button className={`${BUTTON_STYLE}`} onClick={() => navigateAndCloseMenu('/adherents')}>
                <IonIcon icon={people} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Adhérents</div>}
            </button>

            <button className={`${BUTTON_STYLE}`}>
                <IonIcon icon={cash} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Remboursements</div>}
            </button>

            <button className={`${BUTTON_STYLE}`}>
                <IonIcon icon={home} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Déclaration salaires</div>}
            </button>

            <button className={`${BUTTON_STYLE}`}>
                <IonIcon icon={helpCircle} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Assistance</div>}
            </button>

            <button className={`${BUTTON_STYLE}`}>
                <IonIcon icon={person} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Profile</div>}
            </button>

            <button className={`${BUTTON_STYLE}`}>
                <IonIcon icon={logOut} slot="start" />
                {isExpanded && <div className={`${LABEL_STYLE}`}>Se déconnecter</div>}
            </button>
        </div>
    );
};

export default CustomSidebar;
