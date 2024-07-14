import React, { useRef, useState } from 'react';
import { IonAccordion, IonAccordionGroup, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { peopleOutline, cashOutline, homeOutline, personOutline, helpCircleOutline, logOutOutline, people, cash, home, helpCircle, person, logOut, apps } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './UserSidebar.css'
import { useAuthContext } from '../../../context/AuthProvider';

const BUTTON_STYLE = "text-2xl !text-primary flex justify-start items-center relative";

const LABEL_STYLE = "!text-sm !truncate !text-primary truncate";

const ITEM_STYLE = 'w-full ml-10 truncate';

const ACC_STYLE = "!text-sm ml-10 truncate"

interface UserSidebarProps {
    isExpanded: boolean,
    setIsExpanded: (value: boolean) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isExpanded, setIsExpanded }) => {

    const { setUser } = useAuthContext();
    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    const history = useHistory();

    const navigateAndCloseMenu = (path: string) => {
        setIsExpanded(false);
        history.push(path);
    };


    // const [startX, setStartX] = useState(0);
    // const [currentX, setCurrentX] = useState(0);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // const handleTouchStart = (e: React.TouchEvent) => {
    //     setStartX(e.touches[0].clientX);
    // };

    // const handleTouchMove = (e: React.TouchEvent) => {
    //     const touchX = e.touches[0].clientX;
    //     setCurrentX(touchX);
    //     const width = touchX > 300 ? 300 : touchX < 60 ? 60 : touchX;
    //     if (sidebarRef.current) {
    //         sidebarRef.current.style.width = `${width}px`;
    //     }
    // };

    // const handleTouchEnd = () => {
    //     setIsExpanded(currentX > 150);
    //     if (sidebarRef.current) {
    //         sidebarRef.current.style.width = currentX > 150 ? '300px' : '60px';
    //     }
    //     setStartX(0);
    //     setCurrentX(0);
    // };

    // const toggleMenu = () => {
    //     setIsExpanded(!isExpanded);
    // };

    return (
        <div
            ref={sidebarRef}
            className={`shadow-[4px_5px_6px_rgb(0,0,0,.3)] sidebar-custom ${isExpanded ? 'expanded' : ''}`}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
        >
            {isExpanded && <div className='absolute w-screen h-full z-0' onClick={(e: any) => { if (!e.target.closest(".sidebar")) setIsExpanded(false) }}></div>}
            <IonAccordionGroup className='w-full h-full relative z-10 sidebar' onClick={() => { if (!isExpanded) setIsExpanded(true) }}>
                <div className={`flex flex-col ${isExpanded ? "gap-2" : "gap-14"} p-4 ${isExpanded ? "" : "pt-10"}`}>

                    <div className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={apps} slot="start" className='absolute' />
                        {isExpanded && <IonItem className={`${ITEM_STYLE}`} onClick={() => navigateAndCloseMenu("/dashboard")}>
                            <IonLabel className={`${LABEL_STYLE}`}>Dashboard</IonLabel>
                        </IonItem>}
                    </div>

                    <div className={`${BUTTON_STYLE}`}
                    // onClick={() => navigateAndCloseMenu('/adherents')}
                    >
                        <IonIcon icon={people} slot="start" className={`absolute`} />
                        {isExpanded && <IonAccordion value="first" className={`${ACC_STYLE}`}>
                            <IonItem slot="header" >
                                <IonLabel className={`${LABEL_STYLE}`}>Adhérents</IonLabel>
                            </IonItem>
                            <div className="p-4 pl-8" slot="content" onClick={() => { navigateAndCloseMenu("/adherents") }}>
                                Liste de adhérents
                            </div>
                            <div className="p-4 pl-8" slot="content" onClick={() => { navigateAndCloseMenu("/prestataires"); }}>
                                Liste des prestataires
                            </div>
                        </IonAccordion>}
                    </div>

                    <div className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={cash} slot="start" className='absolute' />
                        {isExpanded && <IonAccordion value="second" className={`${ACC_STYLE}`}>
                            <IonItem slot="header">
                                <IonLabel className={`${LABEL_STYLE}`}>Remboursements</IonLabel>
                            </IonItem>
                            <div className="p-4 pl-8" slot="content" onClick={() => navigateAndCloseMenu("/bordereaux")}>
                                Bordereaux
                            </div>
                            <div className="p-4 pl-8" slot="content" onClick={() => navigateAndCloseMenu("/decomptes")}>
                                Recherche decomptes
                            </div>
                            <div className="p-4 pl-8" slot="content" onClick={() => navigateAndCloseMenu("/cumul-prestataires")}>
                                Consommation prestataires
                            </div>
                        </IonAccordion>}
                    </div>

                    <div className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={home} slot="start" className='absolute' />
                        {isExpanded && <IonItem className={`${ITEM_STYLE}`} onClick={() => navigateAndCloseMenu("/declaration")}>
                            <IonLabel className={`${LABEL_STYLE}`}>Déclaration salaires</IonLabel>
                        </IonItem>}
                    </div>

                    <button className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={helpCircle} slot="start" className='absolute' />
                        {isExpanded && <IonItem className={`${ITEM_STYLE}`} onClick={() => navigateAndCloseMenu("/assistance")}>
                            <IonLabel className={`${LABEL_STYLE}`}>Assistance</IonLabel>
                        </IonItem>}
                    </button>

                    <button className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={person} slot="start" className='absolute' />
                        {isExpanded && <IonItem className={`${ITEM_STYLE}`} onClick={() => navigateAndCloseMenu("/profile")}>
                            <IonLabel className={`${LABEL_STYLE}`}>Profile</IonLabel>
                        </IonItem>}
                    </button>

                    <button className={`${BUTTON_STYLE}`}>
                        <IonIcon icon={logOut} slot="start" className='absolute' />
                        {isExpanded && <IonItem className={`${ITEM_STYLE}`} onClick={() => { logout(); navigateAndCloseMenu("/login"); }}>
                            <IonLabel className={`${LABEL_STYLE}`}>Se déconnecter</IonLabel>
                        </IonItem>}
                    </button>
                </div>
            </IonAccordionGroup>
        </div>
    );
};

export default UserSidebar;
